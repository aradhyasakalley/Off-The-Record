import requests
from bs4 import BeautifulSoup

def search_page_flipkart(query):
    search_url = f'https://www.flipkart.com/search?q={query}'
    start_link = 'https://www.flipkart.com'
    result_list = []
    
    response = requests.get(search_url)
    content = BeautifulSoup(response.content, "html.parser")
    data = content.find_all('div', {'class': '_2kHMtA'})
    
    for item in data[:5]:
        rest_link = item.find('a')['href']
        name_element = item.find('div', attrs={'class': '_4rR01T'})
        image_element = item.find('div', attrs={'class': 'CXW8mj'})  # Add this line to find the image
        if name_element is not None:
            name = name_element.text
            link = start_link + rest_link
            image_url = image_element.find('img')['src'] if image_element else None  # Extract image URL if available
            result_list.append({'name': name, 'link': link, 'image_url': image_url})  # Include image URL in the result
            
    return result_list

# # Example usage:
# search_query = 'samsung galaxy s22 ultra'
# results = search_page_flipkart(search_query)
# print(results)
