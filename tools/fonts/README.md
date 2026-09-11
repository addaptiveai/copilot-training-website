# Fonts for the Open Graph card

`poppins-400.woff2` and `poppins-600.woff2` are used only by
`tools/make-og-image.mjs`, which embeds them in an SVG so the rendered card
uses the same typeface as the site.

They are not served to visitors. The site loads Poppins from Google Fonts.

Poppins is licensed under the SIL Open Font License 1.1.
Source: https://fonts.google.com/specimen/Poppins

To refresh:

    curl -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15" \
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600" -o poppins.css

then download the two woff2 URLs it lists.
