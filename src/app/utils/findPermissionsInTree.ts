const findChildren = (tree, children = []) => {
  if (!tree || !tree.length) {
    return [];
  }

  for (let i = 0; i < tree.length; i++) {
    const item = tree[i];
    // @ts-ignore
    children.push(item.code, ...findChildren(item.children));
  }

  return children;
};

export const findPermissionsInTree = (tree, annotation, parents, addParent) => {
  if (!tree || !tree.length) {
    return null;
  }

  for (let i = 0; i < tree.length; i++) {
    const item = tree[i];
    const newParents = addParent ? [...parents] : [];

    newParents.push(item.code);

    if (item.code === annotation) {
      const children = findChildren(item.children);
      return [...newParents, ...children];
    }

    const subParents = findPermissionsInTree(item.children, annotation, newParents, addParent);

    if (subParents) {
      return subParents;
    }
  }

  return null;
};
