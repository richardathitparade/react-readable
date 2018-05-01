import urllib2 
from bs4 import BeautifulSoup
td = "http://www.tractordata.com/"
page = urllib2.urlopen(td)
soup = BeautifulSoup( page, 'html.parser')
td_val = soup.find_all('td', attrs={'class': 'tdData3'})
child_divs = td_val.findChildren()
c = 0
scrape_dict = {}
for child in child_divs:
    if str(child.name) == 'a':
        t = child.text
        href_val = child.attrs['href']
        i_obj  =  child.find('img')
        if not i_obj is None:
            if len(t) > 0 and not 'news' in href_val:
                new_obj = {}
                new_obj['n'] = c
                new_obj['href'] = href_val
                new_obj['img_src'] = i_obj.attrs['src']
                new_obj['name']  = t
                c = c + 1
                scrape_dict[c] = new_obj

for k in scrape_dict.keys():
    obj = scrape_dict[k]
    page_ref = urllib2.urlopen(obj['href'])
    soup_ref = BeautifulSoup(page_ref, 'html.parser')
    model_info = soup_ref.find('table', attrs={'class': 'tdmenu1'})
    thead = model_info.find('thead')
    col_count = 0
    th_cols = thead.find('th')
    for th in th_cols:
        col_count = col_count + 1
    tbody = model_info.find('tbody')
    tds = tbody.find_all('td')
    k = 0
    for td in tds:
        cat = 'model'
        if k % col_count == 1:
            cat = 'power'
        elif k % col_count == 2:
            if col_count == '3':
                cat = 'years'
            else:
                cat = 'mower deck'
        elif k % 4 == 3:
            cat = 'years'
        print(str(k) + ')' + cat + ' - '  + td.text)
        k = k+1

print(scrape_dict)
