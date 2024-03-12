import streamlit as st

# streamlit app to view the embed
def main():
    iframe_url = "https://pricehistoryapp.com/embed/apple-iphone-14-starlight-128-gb"
    st.components.v1.html(f'<iframe src="{iframe_url}" width="100%" height="300" frameborder="0" allowtransparency="true" scrolling="no"></iframe>', height=550)

if __name__ == '__main__':
    main()
