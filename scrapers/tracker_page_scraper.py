import requests
from bs4 import BeautifulSoup
import re
import json

def extract_buying_info(url):
    tracker_url = extract_tracker_link(url)
    if tracker_url is None:
        return None
    
    response = requests.get(tracker_url)
    html_content = response.content
    soup = BeautifulSoup(html_content, "html.parser")

    target_div = soup.find("div", class_="flex flex-row h-10 pt-2")
    minmax_price_div = soup.find('div', class_='content-width mx-auto px-3')

    if target_div and minmax_price_div:
        # Find all child div elements representing rating options
        rating_divs = target_div.find_all("div")
        rating_option = None
        buying_info = None
        for div in rating_divs:
            marker_span = div.find("span", class_="absolute -bottom-4 w-full h-4 flex justify-center")
            if marker_span:
                rating_option = div.find("p").text.strip()
                buying_info_element = soup.find("p", class_="text-gray-500 dark:text-gray-400 text-sm")
                if buying_info_element:
                    buying_info = buying_info_element.get_text(strip=True)
                break  
        prices = {}
        minmax_text = minmax_price_div.get_text(strip=True)
        price_match = re.findall(r'\d+', minmax_text)  # Match decimal numbers
        if price_match and len(price_match) >= 3:
            prices['min'] = price_match[-3]
            prices['average'] = price_match[-2]
            prices['max'] = price_match[-1]

        embedded_iframe = build_embedded_iframe(tracker_url)
        
        return {
            "should_buy": rating_option,
            "buying_info": buying_info,
            "prices": prices,
            "embedded_iframe": embedded_iframe
        }
    else:
        return None

def extract_tracker_link(flipkart_url):
    # Find the position of ".com/"
    start_index = flipkart_url.find(".com/") + len(".com/")
    end_index = flipkart_url.find("/p/")
    if start_index == -1 or end_index == -1:
        print("Invalid Flipkart URL format.")
        return None
    product_name = flipkart_url[start_index:end_index]
    tracker_link = "https://pricehistoryapp.com/product/" + product_name
    return tracker_link

def build_embedded_iframe(tracker_url):
    embedded_url = tracker_url.replace("https://pricehistoryapp.com/product/", "https://pricehistoryapp.com/embed/")
    iframe_code = f'<iframe src="{embedded_url}" width="100%" height="500" frameborder="0" allowtransparency="true" scrolling="no"></iframe>'
    return iframe_code

flipkart_url = 'https://www.flipkart.com/oppo-f25-pro-5g-lava-red-128-gb/p/itm9451b9c477991?pid=MOBGXX3VNCYH65CM&lid=LSTMOBGXX3VNCYH65CMXL5ILC&marketplace=FLIPKART&q=oppo+mobile+5g&store=tyy%2F4io&srno=s_1_1&otracker=AS_QueryStore_OrganicAutoSuggest_1_3_na_na_ps&otracker1=AS_QueryStore_OrganicAutoSuggest_1_3_na_na_ps&fm=Search&iid=b6728532-5222-4d44-ae9c-6eebd4022e4e.MOBGXX3VNCYH65CM.SEARCH&ppt=browse&ppn=browse&ssid=ndphtilv2o0000001710261549218&qH=2e4aa49df1522709'

result = extract_buying_info(flipkart_url)
if result:
    # Convert result to JSON and print
    print(json.dumps(result, indent=4))
else:
    print("Div with class 'flex flex-row h-10 pt-2' or price div not found.")
