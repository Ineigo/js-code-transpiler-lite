import traverse from '@babel/traverse';
import { isObjectExpression, arrayExpression, objectExpression, objectProperty, identifier } from '@babel/types';

export default function marionette2to3(ast, collback = () => {}) {
    let isEdited = false;
    traverse(ast, {
        MemberExpression(path) {
            if (['LayoutView', 'ItemView'].includes(path.node.property.name)) {
                isEdited = true;
                collback(path.node.property.name, 'View');
                path.node.property.name = 'View';
            }

            if (['CompositeView'].includes(path.node.property.name)) {
                isEdited = true;
                collback(path.node.property.name, 'CollectionView');
                path.node.property.name = 'CollectionView';
            }
        },
        Identifier(path) {
            if (path.node.name === 'templateHelpers') {
                isEdited = true;
                collback(path.node.name, 'templateContext');
                path.node.name = 'templateContext';
            }

            if (path.node.name === 'regionShow') {
                isEdited = true;
                collback(path.node.name, 'showChildView');
                path.node.name = 'showChildView';
            }
        },
        ClassProperty(path) {
            if (path.node.key.name === 'behaviors' && isObjectExpression(path.node.value)) {
                isEdited = true;
                collback(path.node.value.type, 'ArrayExpression');
                const elements = [];
                for (const prop of path.node.value.properties) {
                    if (prop.value.properties.length) {
                        elements.push(
                            objectExpression([
                                objectProperty(identifier('behaviorClass'), prop.key),
                                ...prop.value.properties,
                            ])
                        );
                    } else {
                        elements.push(prop.key);
                    }
                }
                path.node.value = arrayExpression(elements);
            }
        },
    });

    return isEdited ? ast : null;
}

// reqres
