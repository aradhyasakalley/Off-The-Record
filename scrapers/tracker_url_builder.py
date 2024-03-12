
flipkart_url = 'https://www.flipkart.com/oppo-f25-pro-5g-lava-red-128-gb/p/itm9451b9c477991?pid=MOBGXX3VNCYH65CM&lid=LSTMOBGXX3VNCYH65CMXL5ILC&marketplace=FLIPKART&q=oppo+mobile+5g&store=tyy%2F4io&srno=s_1_1&otracker=AS_QueryStore_OrganicAutoSuggest_1_3_na_na_ps&otracker1=AS_QueryStore_OrganicAutoSuggest_1_3_na_na_ps&fm=Search&iid=b6728532-5222-4d44-ae9c-6eebd4022e4e.MOBGXX3VNCYH65CM.SEARCH&ppt=browse&ppn=browse&ssid=ndphtilv2o0000001710261549218&qH=2e4aa49df1522709'


def extract_product_name(flipkart_url):
    # Find the position of ".com/"
    start_index = flipkart_url.find(".com/") + len(".com/")
    end_index = flipkart_url.find("/p/")
    product_name = flipkart_url[start_index:end_index]
    return product_name
product_name = extract_product_name(flipkart_url)
tracker_link = "https://pricehistoryapp.com/product/" + product_name
print(tracker_link)