import sunlight
import json
import urllib
sunlight.config.API_KEY = '1e1c9b31bf15440aacafe4125f221bf2'

signedbills = [['HF 2269', 'SF 1832'], ['HF 2647', 'SF 2409'], ['HF 2795', 'SF 1727'], ['HF 2555', 'SF 2304'], ['HF 2171', 'SF 1943'], ['SF 1528', 'HF 2127'], ['HF 2164', 'SF 1830'], ['SF 1679', 'HF 1993'],['HF 2046', 'SF 1958'], ['HF 2136', 'SF 1734'], ['HF 2098', 'SF 1688'], ['SF 288', 'HF 614'], ['SF 1573', 'HF 2065'], ['SF 2493', 'HF 2430'], ['SF 946', 'HF 755'], ['SF 2324', 'HF 2732'], ['HF 2705', 'SF 2340'], ['HF 2638', 'SF 2310'], ['HF 1607', 'SF 1283'], ['SF 2535', 'HF 2759'], ['SF 2342', 'HF 2749'], ['SF 1597', 'HF 1821'], ['HF 2657', 'SF 2249'], ['SF 2334', 'HF 2684'], ['HF 2244', 'SF 1889'], ['SF 2137', 'HF 2553'], ['HF 2294', 'SF 2093'], ['HF 2532', 'SF 2128'], ['SF 1754', 'HF 2259'], ['HF 2398', 'SF 2061'],['HF 2173', 'SF 2067'], ['SF 2392', 'HF 2784'], ['SF 1750', 'HF 2214'], ['HF 2731', 'SF 2216'], ['SF 1922', 'HF 2169'], ['HF 2949', 'SF 2482'], ['HF 2508', 'SF 2319'], ['HF 2447', 'SF 2106'], ['SF 2296', 'HF 2545'],['SF 2112', 'HF 2437'], ['SF 2354', 'HF 2493'], ['SF 2316', 'HF 2495'], ['SF 2464', 'HF 2896'], ['HF 2276', 'SF 1811'], ['HF 2149', 'SF 1657'], ['HF 2861', 'SF 2466'], ['HF 2335', 'SF 1888'], ['HF 2614', 'SF 2227'], ['HF 469', 'SF 574'], ['HF 2246', 'SF 1825'], ['HF 1813', 'SF 1650'], ['HF 1175', 'SF 929'], ['HF 738', 'SF 1000'], ['SF 248', 'HF 383'], ['SF 1675', 'HF 1967'], ['HF 1236', 'SF 0973'], ['SF 1678', 'HF 2059'], ['HF 2160', 'SF 2108'], ['HF 2373', 'SF 1874'], ['HF 2174', 'SF 1737'], ['SF 2379', 'HF 2680'], ['SF 1073', 'HF 1272'], ['HF 2506', 'SF 2059'], ['HF 1850', 'SF 2253'], ['HF 795', 'SF 639'], ['SF 396', 'HF 539'], ['SF 2271', 'HF 2494'], ['SF 2224', 'HF 2582'], ['SF 1123', 'HF 1245'], ['HF 2132', 'SF 2050'], ['SF 1416', 'HF 1595'], ['SF 753', 'HF 1191'], ['SF 2181', 'HF 2650'], ['HF 2239', 'SF 2202'], ['HF 1816', 'SF 2125'], ['SF 1689', 'HF 1416'], ['SF 2360', 'HF 2587'], ['SF 1492', 'HF 2365'], ['SF 2060', 'HF 2770'], ['SF 1599', 'HF 2100'], ['SF 1875', 'HF 2307'], ['SF 1620', 'HF 1833'], ['HF 2128', 'SF 1876'], ['SF 2114', 'HF 2476'], ['SF 1964', 'HF 2263'], ['SF 1626', 'HF 2094'], ['SF 1553', 'HF 1972'], ['SF 1815', 'HF 1989'], ['SF 2184', 'HF 2763'], ['SF 1621', 'HF 2097'], ['SF 2131', 'HF 2378'], ['SF 1586', 'HF 1945'], ['HF 2187', 'SF 1791'], ['HF 2333', 'SF 1870'], ['SF 2394', 'HF 2775'], ['HF 1829', 'SF 1648'], ['HF 2216', 'SF 1910'], ['SF 1543', 'HF 2060'], ['SF 2173', 'HF 2626'], ['HF 1992', 'SF 1687'], ['SF 1809', 'HF 2237'], ['SF 2273', 'HF 2736'], ['SF 1934', 'HF 2342'], ['SF 1860', 'HF 2316'], ['SF 1793', 'HF 1998'], ['SF 1993', 'HF 2354'], ['SF 2069', 'HF 2544'], ['SF 2084', 'HF 2415'], ['SF 2297', 'HF 1899'], ['HF 2676', 'SF 2330'], ['HF 1384', 'SF 1084'], ['SF 1567', 'HF 2095'], ['HF 1903', 'SF 1814'], ['HF 2253', 'SF 1861'], ['HF 2793', 'SF 2426'], ['SF 1917', 'HF 2293'], ['HF 2291', 'SF 2346'], ['HF 2078', 'SF 1990'], ['HF 382', 'SF 352'], ['SF 1735', 'HF 2227'], ['SF 1542', 'HF 2441'], ['HF 1524', 'SF 1932'], ['HF 2376', 'SF 1971'], ['HF 392', 'SF 992'], ['HF 300', 'SF 1160'], ['HF 1738', 'SF 1450'], ['HF 2152', 'SF 1739'], ['HF 1515', 'SF 1272'], ['SF 1183', 'HF 032'], ['SF 1213', 'HF 1484'], ['SF 1240', 'HF 1535'], ['SF 1371', 'HF 1468'], ['HF 1585', 'SF 1322'], ['HF 1926', 'SF 1527'], ['HF 2394', 'SF 1994'], ['HF 1770', 'SF 1493']]
vetoedbills = [['HF 2337', 'SF 1972'], ['SF 1656', 'HF 1847'], ['HF 8', 'SF 32'], ['HF 203', 'SF 261'], ['HF 1870', 'SF 1690'],['HF 2821', 'SF 2424'],['HF 1134', 'SF 877'], ['SF 1933', 'HF 2339'], ['HF 2341', 'SF 1912'], ['SF 1694', 'HF 1774'],['HF 1974', 'SF 2078'], ['SF 1921', 'HF 2340'], ['HF 1976', 'SF 1842'], ['HF 1812', 'SF 1846'], ['SF 247', 'HF 371'], ['SF 2183', 'HF 2596'], ['HF 1766', 'SF 1630'], ['SF 1236', 'HF 1418'], ['HF 2738', 'SF 1577'], ['SF 2014', 'HF 2404'], ['HF 2083', 'SF 2492'], ['HF 545', 'SF 1600'], ['HF 1560', 'SF 993'], ['SF 134', 'HF 212'], ['HF 1467', 'SF 1357'], ['SF 530', 'HF 770'], ['SF 429', 'HF 747'], ['SF 373', 'HF 654'], ['SF 149', 'HF 211']]


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
        categories = mp_categorize(data['subjects'])
        billurl = data['sources'][0]['url']
        
	bill_status = 'indeterminate' #default if for whatever reason we can't get the bill status
	enddate =  data['updated_at'] #if we can't find the date of the last action, used openstates' last update
	startdate = data['created_at'] #if we can't find an earlier date in actions, startdate
	if startdate[8:10].isdigit() and startdate[5:7].isdigit():
		startdate_day = int(startdate[8:10])
		startdate_month = int(startdate[5:7])
	else:
		startdate_day = -1
	try:
		for action in data['actions']:
			if action['type'] == ['governor:vetoed']: #find if a governor:vetoed action exist
				bill_status = 'vetoed'
				categories.append('Vetoed')
				enddate = action['date']
			if action['type'] == ['governor:signed']: #find if a governor:signed action exists
				bill_status = 'signed'
				enddate = action['date']
			if int(action['date'][5:7]) < startdate_month: #if an action has a lower month
				startdate = action['date'] #update startdate
				startdate_day = int(startdate[8:10]) #update startdate_day and _month for further testing
				startdate_month = int(startdate[5:7])
			else:
				if int(action['date'][5:7]) == startdate_month and int(action['date'][8:10]) < startdate_day: #if the month is the same, but the day of the current action is lower, that is the earliest action
					startdate = action['date'] #update startdate
					startdate_day = int(startdate[8:10]) #update startdate_day for further tests
					startdate_month = int(startdate[5:7]) #update startdate_month for further tests
	except:
		bill_status = 'actions unavailable'

        
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
	if len(bill[0][3:]) == 3: #if it's a 3-digit bill number, add a leading 0 to scraper url
		scraper_url += '0'
		scraper_url += bill[0][3:]
	else:
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
        	if e['name'] == 'Hayden': #sad little hack to fix Jeff Hayden's missing legid
        		sen_sponsor_ids.append('MNL000364')
        	else:
        		sen_sponsor_ids.append(e['leg_id']) #build list of leg ids and leg full names
        house_sponsor_ids = []
        for e in house_sponsors:
            house_sponsor_ids.append(e['leg_id'])
        
        house_sponsors = get_leg_info(house_sponsor_ids)
        senate_sponsors = get_leg_info(sen_sponsor_ids)
        
        #create a dictionary of the bill info and write it to the all_bills dict
        billinfo = {}
        billinfo['title'] = title
        billinfo['bill_status'] = bill_status
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
				legs.append(['data unavailable','','',''])	
    return legs
    
def mp_categorize(subject_list):
	final_subjects = []
	
	subject_map = {
		'Agriculture and Food' : 'Agriculture and Food' , 
		'Animal Rights and Wildlife Issues' : 'Environment and Recreation' , 
		'Arts and Humanities' : 'Arts and Humanities' , 
		'Budget, Spending, and Taxes' : 'Budget, Spending and Taxes' , 
		'Business and Consumers' : 'Business and Economy' , 
		'Campaign Finance and Election Issues' : 'Campaign Finance and Election Issues' , 
		'Civil Liberties and Civil Rights' : 'Social Issues' , 
		'Commerce' : 'Business and Economy' , 
		'Crime' : 'Crime and Drugs' , 
		'Drugs' : 'Crime and Drugs' , 
		'Education' : 'Education' , 
		'Energy' : 'Energy and Technology' , 
		'Environmental' : 'Environment and Recreation' , 
		'Executive Branch' : 'Government' , 
		'Family and Children Issues' : 'Social Issues' , 
		'Federal, State, and Local Relations' : 'Government' , 
		'Gambling and Gaming' : 'Gambling and Gaming' , 
		'Government Reform' : 'Government' , 
		'Guns' : 'Guns' , 
		'Health' : 'Health and Science' , 
		'Housing and Property' : 'Housing and Property' , 
		'Immigration' : 'Immigration' , 
		'Indigenous Peoples' : 'Social Issues' , 
		'Insurance' : 'Insurance' , 
		'Judiciary' : 'Legal' , 
		'Labor and Employment' : 'Business and Economy' , 
		'Legal Issues' : 'Legal' , 
		'Legislative Affairs' : 'Government' , 
		'Military' : 'Military' , 
		'Municipal and County Issues' : 'Government' , 
		'Nominations' : '' , 
		'Other' : '' , 
		'Public Services' : 'Government' , 
		'Recreation' : 'Environment and Recreation' , 
		'Reproductive Issues' : 'Reproductive Issues' , 
		'Resolutions' : '' , 
		'Science and Medical Research' : 'Health and Science' , 
		'Senior Issues' : 'Social Issues' , 
		'Sexual Orientation and Gender Issues' : 'Social Issues' , 
		'Social Issues' : 'Social Issues' , 
		'State Agencies' : '' , 
		'Technology and Communication' : 'Energy and Technology' , 
		'Trade' : 'Business and Economy' , 
		'Transportation' : 'Transporation' , 
		'Welfare and Poverty' : 'Welfare and Poverty' 
	}
	
	for subject in subject_list:
		newsubject = subject_map[subject]
		if newsubject not in final_subjects and newsubject != '':
			final_subjects.append(newsubject)
	return final_subjects

f = open('bills.json', 'a')
f.write(add_to_json(signedbills+vetoedbills) + "\n")
f.close()