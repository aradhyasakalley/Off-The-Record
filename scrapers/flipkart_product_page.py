import requests
from bs4 import BeautifulSoup

def flipkart_product_page_scraper(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,/;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'Connection': 'keep-alive'
    }

    page = requests.get(url, headers=headers)
    soup = BeautifulSoup(page.content, 'html.parser')
    
    data = {}

    title_tag = soup.find('h1', class_="yhB1nd")
    title = title_tag.text.strip() if title_tag else None
    data['title'] = title

    img_tag = soup.find('img', class_='_396cs4 _2amPTt _3qGmMb')
    image_src = img_tag['src'] if img_tag else None
    data['image'] = image_src

    reviews_div = soup.find('span', class_="_2_R_DZ")
    reviews = reviews_div.text.strip() if reviews_div else None
    data['reviews'] = reviews

    stars_div = soup.find('div', class_="_3LWZlK")
    stars = stars_div.text.strip() if stars_div else None

    price_div = soup.find('div', class_="_30jeq3 _16Jk6d")
    price = price_div.text.strip() if price_div else None
    data['price'] = price
    
    disc_perc_div = soup.find('div', class_ = '_3Ay6Sb _31Dcoz')
    disc_perc = disc_perc_div.text.strip() if disc_perc_div else None
    data['disc_perc'] = disc_perc

    description_div = soup.find('div', class_='_1mXcCf RmoJUa')
    description = description_div.find('p').text.strip() if description_div and description_div.find('p') else None

    offers_divs = soup.find_all('div', class_='WT_FyS')
    offers = [div.text.strip() for div in offers_divs]

    highlights_div = soup.find('div', class_='_2cM9lP')
    highlights_title_div = highlights_div.find('div', class_='_3a9CI2') if highlights_div else None
    highlights_title = highlights_title_div.text.strip() if highlights_title_div else None
    highlights_ul = highlights_div.find('ul') if highlights_div else None
    highlights_list = [li.text.strip() for li in highlights_ul.find_all('li')] if highlights_ul else []

    category_divs = soup.find_all('a', class_="_2whKao")
    category = [div.text.strip() for div in category_divs][:3]

    data['description'] = description
    data['offers'] = offers
    data['category'] = category
    data['highlights'] = highlights_list

    return data
