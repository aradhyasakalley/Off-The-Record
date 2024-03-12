def build_embedded_iframe(tracker_url):
    embedded_url = tracker_url.replace("https://pricehistoryapp.com/product/", "https://pricehistoryapp.com/embed/")
    iframe_code = f'<iframe src="{embedded_url}" width="100%" height="500" frameborder="0" allowtransparency="true" scrolling="no"></iframe>'
    return iframe_code

# Example usage
tracker_url = "https://pricehistoryapp.com/product/samsung-galaxy-s22-ultra-5g-phantom-black-256-gb"
iframe_code = build_embedded_iframe(tracker_url)
print(iframe_code)