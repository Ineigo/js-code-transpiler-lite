import traverse from '@babel/traverse';

export default function marionette2to3(ast, collback = () =>{}) { 
    let isEdited = false
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
    });

    return isEdited ? ast : null;
}