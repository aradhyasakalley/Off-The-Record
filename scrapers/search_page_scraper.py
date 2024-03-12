import requests
from bs4 import BeautifulSoup

search_url = 'https://www.flipkart.com/search?q=samsung%20salaxy%20s22%20ultra'
start_link = 'https://www.flipkart.com'
result_list = []
response = requests.get(search_url)
content = BeautifulSoup(response.content, "html.parser")
data = content.find_all('div',{'class':'_2kHMtA'})
for item in data[:5]:
    rest_link = item.find('a')['href']
    name_element = item.find('div', attrs={'class': '_4rR01T'})
    if name_element is not None:
        name = name_element.text
        link = start_link + rest_link
        result_list.append({'name': name, 'link': link})

print(result_list)