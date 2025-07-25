# DOMBubble

DOMBubble is a JavaScript library that allows you to create and manage custom DOM bubbles with various styling options. The library automatically handles the creation, positioning, and styling of the bubbles based on the provided configuration.

## Features

- **Responsive Bubbles**: The bubbles automatically adjust their size and position to fit their parent container.
- **Customizable Styles**: You can configure various properties of the bubbles, such as direction, position, border color, background color, and more.
- **Dynamic Updates**: The bubbles can be updated and refreshed programmatically, allowing you to change their content and styles on the fly.
- **Easy Integration**: The library provides a simple API for creating and managing the bubbles, making it easy to integrate into your existing projects.

## Usage

1. Include the DOMBubble library in your HTML file:

```html
<script src="path/to/DOMBubble.js"></script>
```

2. Create a DOM element with the `<dom-bubble>` tag, and add your desired content and configuration:

```html
<dom-bubble
  data-direction="bottom"
  data-position="50%"
  data-border-color="#999999"
  data-border-width="3px"
  data-background="#eeeeee"
  data-border-radius="1.2em"
  data-height="1em"
  data-angle="90deg"
  data-min-width=""
  data-min-height=""
>
  This is a custom DOM bubble.
</dom-bubble>
```

3. The DOMBubble library will automatically initialize and manage the bubble.

## API

The DOMBubble library provides the following API:

### `DOMBubble.make_dom_bubble()`

Creates a new DOM bubble element and returns it.

### `DOMBubble.dom_default_style`

An object containing the default styles for the DOM bubbles.

## Customization

You can customize the appearance and behavior of the DOM bubbles by modifying the default styles or by setting the corresponding attributes on the `<dom-bubble>` element.

## Examples

Check out the `examples/` directory for sample implementations of the DOMBubble library.

## Contributing

If you find any issues or have suggestions for improvements, feel free to create a new issue or submit a pull request on the [GitHub repository](https://github.com/your-username/DOMBubble).

## License

This project is licensed under the [MIT License](LICENSE).