import requests
from bs4 import BeautifulSoup

def search_page_flipkart(query):
    search_url = f'https://www.flipkart.com/search?q={query}'
    start_link = 'https://www.flipkart.com'
    result_list = []
    
    response = requests.get(search_url)
    content = BeautifulSoup(response.content, "html.parser")
    data = content.find_all('div', {'class': '_2kHMtA'})
    
    for index, item in enumerate(data[:12]):
        rest_link = item.find('a')['href']
        name_element = item.find('div', attrs={'class': '_4rR01T'})
        price_element = item.find('div', attrs={'class': '_30jeq3 _1_WHN1'})  # Add this line to find the price
        image_element = item.find('div', attrs={'class': 'CXW8mj'})
        
        if name_element is not None and price_element is not None:  # Check if both name and price elements are found
            name = name_element.text
            price = price_element.text  # Extracting the price text
            link = start_link + rest_link
            image_url = image_element.find('img')['src'] if image_element else None
            result_list.append({'id': index, 'name': name, 'price': price, 'link': link, 'image_url': image_url})
            
    return result_list
# # Example usage:
# search_query = 'samsung galaxy s22 ultra'
# results = search_page_flipkart(search_query)
# print(results)
