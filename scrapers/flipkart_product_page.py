import requests
from bs4 import BeautifulSoup

# this function takes in the url for the product page as input and return as dictionary of format 
# {
#     'title': '', 
#     'image': '', 
#     'reviews': '', 
#     'price': '', 
#     'disc_perc': '', 
#     'highlights': [], 
#     'offers': [], 
#     'category': []
# }

def flipkart_scraper(url):
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

    title = soup.find('h1', class_="yhB1nd").text
    data['title'] = title

    img_tag = soup.find('img', class_='_396cs4 _2amPTt _3qGmMb')
    image_src = img_tag['src']
    data['image'] = image_src

    value = soup.find('span', class_="_2_R_DZ").text.strip()
    split = value.split("&")
    ratings = split[0].split()[0]
    reviews = split[1].split()[0]
    # data['ratings'] = ratings
    data['reviews'] = reviews

    stars = soup.find('div', class_="_3LWZlK").text
    # data['stars'] = stars

    price = soup.find('div', class_="_30jeq3 _16Jk6d").text
    data['price'] = price
    disc_perc = soup.find('div', class_ = '_3Ay6Sb _31Dcoz').text
    data['disc_perc'] = disc_perc
    description_div = soup.find('div', class_='_1mXcCf RmoJUa')
    if description_div:
        description_p = description_div.find('p')
        description = description_p.text.strip() if description_p else None
        data['description'] = description
    offers = [div.text.strip() for div in soup.find_all('div', class_='WT_FyS')]
    highlights_div = soup.find('div', class_='_2cM9lP')
    if highlights_div:
        highlights_title_div = highlights_div.find('div', class_='_3a9CI2')
        highlights_ul = highlights_div.find('ul')
        highlights_title = highlights_title_div.text.strip() if highlights_title_div else None
        highlights_list = [li.text.strip() for li in highlights_ul.find_all('li')] if highlights_ul else []
        data['highlights'] = highlights_list
    data['offers'] = offers
    category_div = soup.find_all('a', class_="_2whKao")
    j = []
    for i in category_div:
        j.append(i.text)
        
    category = j[:3]
    data['category'] = category
    return data

# sample usage
url = "https://www.flipkart.com/samsung-galaxy-s22-ultra-5g-phantom-black-256-gb/p/itm7ca5bd1817da5?pid=MOBGGG2YA4MHBBZZ&lid=LSTMOBGGG2YA4MHBBZZM13247&marketplace=FLIPKART&q=samsung+salaxy+s22+ultra&store=tyy%2F4io&srno=s_1_1&otracker=search&fm=organic&iid=fc77eb28-163b-45d7-852f-3d9e7078033d.MOBGGG2YA4MHBBZZ.SEARCH&ppt=None&ppn=None&ssid=zg1wh4w0m80000001710259792634&qH=c6e1a112140f4071"
product_data = flipkart_scraper(url)
print(product_data)