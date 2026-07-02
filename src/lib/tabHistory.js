// Tracks the last visited full path (including query string) for each tab root
const tabLastPath = {};

const TAB_ROOTS = ["/", "/glossary", "/deadlines", "/settings"];

export function getTabRoot(pathname) {
  return TAB_ROOTS.find((root) => pathname === root || pathname.startsWith(root + "/")) || null;
}

export function saveTabPath(pathname, search) {
  const root = getTabRoot(pathname);
  if (root) tabLastPath[root] = pathname + search;
}

export function getTabLastPath(tabRoot) {
  return tabLastPath[tabRoot] || tabRoot;
}

export { TAB_ROOTS };