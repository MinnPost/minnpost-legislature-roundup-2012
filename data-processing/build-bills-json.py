import sunlight
import json
import urllib
sunlight.config.API_KEY = '1e1c9b31bf15440aacafe4125f221bf2'

signedbills = [['HF 2173', 'SF 2067'], ['SF 2392', 'HF 2784'], ['SF 1750', 'HF 2214'], ['HF 2731', 'SF 2216'], ['SF1922', 'HF2169'], ['HF2949', 'SF2482'], ['HF2508', 'SF2319'], ['HF 2447', 'SF 2106'], ['SF 2296', 'HF 2545'],['SF 2112', 'HF 2437'], ['SF 2354', 'HF 2493'], ['SF 2316', 'HF 2495'], ['SF 2464', 'HF 2896'], ['HF 2276', 'SF 1811'], ['HF 2149', 'SF 1657'], ['HF 2861', 'SF 2466'], ['HF 2335', 'SF 1888'], ['HF 2614', 'SF 2227'], ['HF 0469', 'SF 0574'], ['HF 2246', 'SF 1825'], ['HF 1813', 'SF 1650'], ['HF 1175', 'SF 0929'], ['HF 0738', 'SF 1000'], ['SF 248', 'HF 0383'], ['SF 1675', 'HF 1967'], ['HF 1236', 'SF 0973'], ['SF 1678', 'HF 2059'], ['HF 2160', 'SF 2108'], ['HF 2373', 'SF 1874'], ['HF 2174', 'SF 1737'], ['SF 2379', 'HF 2680'], ['SF 1073', 'HF 1272'], ['HF 2506', 'SF 2059'], ['HF 1850', 'SF 2253'], ['HF 795', 'SF 0639'], ['SF 396', 'HF 0539'], ['SF 2271', 'HF 2494'], ['SF 2224', 'HF 2582'], ['SF 1123', 'HF 1245'], ['HF 2132', 'SF 2050'], ['SF 1416', 'HF 1595'], ['SF 0753', 'HF 1191'], ['SF 2181', 'HF 2650'], ['HF 2239', 'SF 2202'], ['HF 1816', 'SF 2125'], ['SF 1689', 'HF 1416'], ['SF 2360', 'HF 2587'], ['SF 1492', 'HF 2365'], ['SF 2060', 'HF 2770'], ['SF 1599', 'HF 2100'], ['SF 1875', 'HF 2307'], ['SF 1620', 'HF 1833'], ['HF 2128', 'SF 1876'], ['SF 2114', 'HF 2476'], ['SF 1964', 'HF 2263'], ['SF 1626', 'HF 2094'], ['SF 1553', 'HF 1972'], ['SF 1815', 'HF 1989'], ['SF 2184', 'HF 2763'], ['SF 1621', 'HF 2097'], ['SF 2131', 'HF 2378'], ['SF 1586', 'HF 1945'], ['HF 2187', 'SF 1791'], ['HF 2333', 'SF 1870'], ['SF 2394', 'HF 2775'], ['HF 1829', 'SF 1648'], ['HF 2216', 'SF 1910'], ['SF 1543', 'HF 2060'], ['SF 2173', 'HF 2626'], ['HF 1992', 'SF 1687'], ['SF 1809', 'HF 2237'], ['SF 2273', 'HF 2736'], ['SF 1934', 'HF 2342'], ['SF 1860', 'HF 2316'], ['SF 1793', 'HF 1998'], ['SF 1993', 'HF 2354'], ['SF 2069', 'HF 2544'], ['SF 2084', 'HF 2415'], ['SF 2297', 'HF 1899'], ['HF 2676', 'SF 2330'], ['HF 1384', 'SF 1084'], ['SF 1567', 'HF 2095'], ['HF 1903', 'SF 1814'], ['HF 2253', 'SF 1861'], ['HF 2793', 'SF 2426'], ['SF 1917', 'HF 2293'], ['HF 2291', 'SF 2346'], ['HF 2078', 'SF 1990'], ['HF 0382', 'SF 0352'], ['SF 1735', 'HF 2227'], ['SF 1542', 'HF 2441'], ['HF 1524', 'SF 1932'], ['HF 2376', 'SF 1971'], ['HF 0392', 'SF 0992'], ['HF 0300', 'SF 1160'], ['HF 1738', 'SF 1450'], ['HF 2152', 'SF 1739'], ['HF 1515', 'SF 1272'], ['SF 1183', 'HF 0032'], ['SF 1213', 'HF 1484'], ['SF 1240', 'HF 1535'], ['SF 1371', 'HF 1468'], ['HF 1585', 'SF 1322'], ['HF 1926', 'SF 1527'], ['HF 2394', 'SF 1994'], ['HF 1770', 'SF 1493']]
vetoedbills = [['HF 1974', 'SF 2078'], ['SF 1921', 'HF 2340'], ['HF 1976', 'SF 1842'], ['HF 1812', 'SF 1846'], ['SF 0247', 'HF 0371'], ['SF 2183', 'HF 2596'], ['HF 1766', 'SF 1630'], ['SF 1236', 'HF 1418'], ['HF 2738', 'SF 1577'], ['SF 2014', 'HF 2404'], ['HF 2083', 'SF 2492'], ['HF 0545', 'SF 1600'], ['HF 1560', 'SF 0993'], ['SF 134', 'HF 0212'], ['HF 1467', 'SF 1357'], ['SF 530', 'HF 0770'], ['SF 0429', 'HF 0747'], ['SF 0373', 'HF 0654'], ['SF 0149', 'HF 0211']]

all_bills = {}
knownlegs = {}

def add_to_json(bills):
    for bill in bills:
    	try:
        	data = sunlight.openstates.bill_detail('MN','2011-2012',bill[0])
        except:
        	data = {'title':'not found','created_at':'not found','updated_at':'not found','subjects':'not found','sources' : [{'url': 'not found'}],'votes': [],'sponsors':[]}
        try:
        	companiondata = sunlight.openstates.bill_detail('MN','2011-2012',bill[1])
        except:
        	companiondata = {'votes': [],'sponsors':[]}
        
        title = data['title']
        startdate = data['created_at'] 
        enddate =  data['updated_at']
        categories = data['subjects']
        billurl = data['sources'][0]['url']
        
        #get the vote totals for the House. Sadly, openstates doesn't have data for MN Senate votes
        
        #so we know where we were unsuccessful at getting the real total
        votesfor_house = -1
        votesagainst_house = -1
        
        #when companion bill has no vote data
        if companiondata['votes'] == []:
            #all vote data contained within main bill, no need to look at companion bill votes
            for vote in data['votes']:
			    #if vote['chamber'] == 'upper': #D'oh, openstates doesn't have Senate vote totals
			    #    votesfor_senate = vote['yes_count']
			    #    votesagainst_senate = vote['no_count']
			    if vote['chamber'] == 'lower':
			        votesfor_house = vote['yes_count']
			        votesagainst_house = vote['no_count']
        else:          			
            if bill[0][0:2] == 'SF':
				votesfor_house = companiondata['votes'][-1]['yes_count']
				votesagainst_house = companiondata['votes'][-1]['no_count']
            else:
				votesfor_house = data['votes'][-1]['yes_count']
				votesagainst_house = data['votes'][-1]['no_count']
	
	#get Senate votes from scraperwiki
	votesfor_senate = -1 #Default value for senate votes, to flag errors in getting the vote
	votesagainst_senate = -1

	scraper_url = "http://api.scraperwiki.com/api/1.0/datastore/sqlite?format=jsondict&name=mn_bills&query=select%20*%20from%20%60swdata%60%20where%20bill%20IN%20('"
	scraper_url += bill[0][0:2]
	scraper_url += bill[0][3:]
	scraper_url += "')"
	
	response = urllib.urlopen(scraper_url)
	content = response.read()
	senate_data = json.loads(content.decode('utf8'))
	if senate_data != []: #only update the votes if we actually have data
		votesfor_senate = senate_data[0]['senate_vote_yes']
		votesagainst_senate = senate_data[0]['senate_vote_no']
		
        #get sponsors in both houses
        if bill[0][0:2] == 'SF':
            senate_sponsors = data['sponsors']
            house_sponsors = companiondata['sponsors']
        else:
            house_sponsors = data['sponsors']
            senate_sponsors = companiondata['sponsors']
            
        sen_sponsor_ids = []
        for e in senate_sponsors:
            sen_sponsor_ids.append(e['leg_id'])
        house_sponsor_ids = []
        for e in house_sponsors:
            house_sponsor_ids.append(e['leg_id'])
        
        house_sponsors = get_leg_info(house_sponsor_ids)
        senate_sponsors = get_leg_info(sen_sponsor_ids)
        
        #create a dictionary of the bill info and write it to the all_bills dict
        billinfo = {}
        billinfo['title'] = title
        billinfo['start_date'] = startdate
        billinfo['end_date'] = enddate
        billinfo['house_ayes'] = votesfor_house
        billinfo['house_nays'] = votesagainst_house
        billinfo['senate_ayes'] = votesfor_senate
        billinfo['senate_nays'] = votesagainst_senate
        billinfo['senate_sponsors'] = senate_sponsors
        billinfo['house_sponsors'] = house_sponsors
        billinfo['categories'] = categories
        billinfo['billurl'] = billurl
        
        all_bills[bill[0]] = billinfo
        
    #output a JSON
    return json.dumps(all_bills)

        
def get_leg_info(legids):
    legs = []
    for legislator in legids:
        if legislator in knownlegs:
            legs.append(knownlegs[legislator])
        else:
			try:
				legdata = sunlight.openstates.legislator_detail(legislator)
				name = legdata['full_name']
				party = legdata['party']
				photo = legdata['photo_url']
				url = legdata['url']
				knownlegs[legislator] = [name, party, photo, url]
				legs.append([name, party, photo, url])
			except:
				knownlegs[legislator] = ['data unavailable']
    return legs

f = open('signedbills.json', 'a')
f.write(add_to_json(signedbills) + "\n")
f.close()

f = open('vetoedbills.json', 'a')
f.write(add_to_json(vetoedbills) + "\n")
f.close()
