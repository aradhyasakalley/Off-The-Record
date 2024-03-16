import requests
from urllib.parse import quote

# this fucntion takes in the search query and builds the flipkart search results page url to scrape 
def build_search_url(query):
    base_url = "https://www.flipkart.com/search?q="
    encoded_query = quote(query)
    search_url = base_url + encoded_query
    return search_url

search_query = "samsung salaxy s22 ultra"
search_url = build_search_url(search_query)
print(search_url)