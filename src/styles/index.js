const requireAll = (requireContext) => requireContext.keys().map(requireContext);

import "normalize.css";
import "./vars.pcss";
import "./general.pcss";
import "./typo.pcss";

if(process.env.NODE_ENV !== "test") {
  requireAll(require.context("./blocks", false, /\.(pcss|css)$/i));
}
