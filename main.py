from fastapi import FastAPI,HTTPException
from typing import List,Dict,Optional
from fastapi.middleware.cors import CORSMiddleware
from scrapers.search_page_scraper import search_page_flipkart
from scrapers.flipkart_product_page import flipkart_product_page_scraper
from scrapers.tracker_page_scraper import extract_buying_info
from scrapers.graph_embed_builder import build_embedded_iframe
from scrapers.tracker_url_builder import extract_tracker_link


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.get("/")
async def hello():
    return {'message' : 'hello world'}

@app.get("/search/")
async def search_product(query: str) -> List[dict]:
    results = search_page_flipkart(query)
    return results

@app.get("/product/")
async def scrape_product_page(url: str) -> Dict:
    product_data = flipkart_product_page_scraper(url)
    return product_data

@app.get("/tracker/")
async def track_product(url: str) -> Optional[Dict]:
    tracker_url = extract_tracker_link(url)
    if tracker_url:
        buying_info = extract_buying_info(url)
        return buying_info
    else:
        return {"error": "Failed to extract tracker URL from the provided Flipkart URL."}