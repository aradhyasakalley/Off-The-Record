from fastapi import FastAPI
from typing import List

from scrapers.search_page_scraper import search_page_flipkart
from scrapers.flipkart_product_page import flipkart_product_page_scraper
from scrapers.tracker_page_scraper import extract_buying_info
from scrapers.graph_embed_builder import build_embedded_iframe
from scrapers.tracker_url_builder import extract_tracker_link


app = FastAPI()

@app.get("/")
async def hello():
    return {'message' : 'hello world'}

@app.get("/search/")
async def search_product(query: str) -> List[dict]:
    results = search_page_flipkart(query)
    return results