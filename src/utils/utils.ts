function getListStyle(style: any): "list" | "card" {
  if (style && style == "card") {
    return style;
  }
  return "list";
}

export { getListStyle };
