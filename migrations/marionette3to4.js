import traverse from '@babel/traverse';
import { isObjectExpression, arrayExpression, objectExpression, objectProperty, identifier } from '@babel/types';

export default function marionette2to3(ast, collback = () => {}) {
    let isEdited = false;
    traverse(ast, {
        MemberExpression(path) {
            if (path.node.object.name === 'Marionette' && ['Object'].includes(path.node.property.name)) {
                isEdited = true;
                collback(path.node.property.name, 'MnObject');
                path.node.property.name = 'MnObject';
            }
        },     

        ObjectProperty(path) {
            if (path.node.key.name === 'defaults') {
                const callExpression = path.find(parentPath => parentPath.isCallExpression());
                try {
                    const name = callExpression.get('callee.object.property').node.name;
                    if (name === 'Behavior') {
                        isEdited = true;
                        collback(path.node.key.name, 'options');
                        path.node.key.name = 'options';
                    }
                } catch(e) {  }
            }
        },
    });

    return isEdited ? ast : null;
}
