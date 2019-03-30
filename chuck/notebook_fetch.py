#%% Change working directory from the workspace root to the ipynb file location. Turn this addition off with the DataScience.changeDirOnImportExport setting
import os
try:
	os.chdir(os.path.join(os.getcwd(), 'what-is-for-lunch'))
	print(os.getcwd())
except:
	pass

#%%
# Dependencies
import requests
from pprint import pprint
# from config import api_key

url = 'https://api.nal.usda.gov/ndb/search/?format=json&q='


#%%
# Search for articles that mention granola
query = 'butter'


#%%
query_url = url + query + '&sort=n&max=25&offset=0&ds=sr&api_key=' + api_key
# Request articles
articles = requests.get(query_url).json()

# The "response" property in articles contains the actual articles
# list comprehension.
articles_list = [article for article in articles]
pprint(articles_list)
query_url


#%%

# List of ndb numbers to be searched
ndbno_numbers = [13346,22908,7073,19002,7007,23090,13330,13317,7068,7921,13926,23136,13148,7033,10153,10870,15085,15084,15266,15128,35157,15005,15009,15017,15040]
# Tha base url to be used in the api calls
base_url = 'https://api.nal.usda.gov/ndb/V2/reports?'
# Define the search url
search_url = ''
# Create a variable to hold the string to be attached to the bas url
search_string = ''
# Loop to add each number to the base url to create the search url
for number in ndbno_numbers:
	search_string = f'{search_string}ndbno={number}&'
# Combine the base url, search url, and type/format/api_key strings
search_url = base_url + search_string + 'type=b&format=json&api_key='
print(search_url)