import requests
from bs4 import BeautifulSoup
import re

def build_embedded_iframe(tracker_url):
    embedded_url = tracker_url.replace("https://pricehistoryapp.com/product/", "https://pricehistoryapp.com/embed/")
    iframe_code = f'<iframe src="{embedded_url}" width="100%" height="500" frameborder="0" allowtransparency="true" scrolling="no"></iframe>'
    return iframe_code

def extract_buying_info(url):
    response = requests.get(url)
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
        prices = []
        minmax_text = minmax_price_div.get_text(strip=True)
        price_match = re.findall(r'\d+', minmax_text)  # Match decimal numbers
        if price_match:
            prices = price_match[-3:] 

        embedded_iframe = build_embedded_iframe(url)
        
        return {
            "should_buy": rating_option,
            "buying_info": buying_info,
            "prices": prices,
            "embedded_iframe": embedded_iframe
        }
    else:
        return None

# Example usage
# url = "https://pricehistoryapp.com/product/samsung-galaxy-s22-ultra-5g-phantom-black-256-gb"
# result = extract_buying_info(url)
# if result:
#     print(result)
# else:
#     print("Div with class 'flex flex-row h-10 pt-2' or price div not found.")
