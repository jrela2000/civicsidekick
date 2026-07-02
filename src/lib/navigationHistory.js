// Tracks navigation direction for native-feeling transitions
// -1 = going back (slide right), 1 = going forward (slide left)

const ROUTE_DEPTH = {
  "/": 0,
  "/glossary": 1,
  "/officials": 1,
  "/settings": 1,
  "/deadlines": 1,
};

export function getDepth(pathname) {
  return ROUTE_DEPTH[pathname] ?? 1;
}