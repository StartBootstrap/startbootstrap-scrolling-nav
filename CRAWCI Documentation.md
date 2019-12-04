# The CRAWCI project. The crime rate, Average wages, and Cultural Institutions: what relationship?

- Simay Guzel 
- Elizaveta Siurina
- Hizkiel Mitiku Alemayehu

## 1. Introduction

In modern theoretical approaches, culture is considered as a value, which is connected to the quality of human living.  The cultural forms have been and are still used for the accomplishment of wider and bigger aims in the education, building a democratic society of strong individuals, achieving progress in all sphears of life. The presence of cultural institutions enriches and raises the quality of life, provides economic and spiritual reproduction.

The culture as a resource for development refers to the way of life, the wealth,  the human relationship  with others, including, for example, labor relationship and conditions.</p>

If labor market conditions are related in an important way to crime, or an individual’s intentions to commit criminal acts are altered by the economic situation, then one may see the dependency of wages and crimes. At this point, we are making an assumption that the level of cultural education is linked both to the labour conditions of an individual as well as crime rates. Hence, our hypothesis is that the presence of cultural institutions influences crime rate and amount of salaries.</p>

## 2. Application scenario

CRAWCI aligns data from different sources in order to gain knowledge about the existence of the cultural institutions throughout Italian regions. The project looks at the relationship between the number of cultural institutions, digitalization, average salary and the number of crime reports by region in Italy.
The project aligns 1) the number of theaters; 2)the percentage of internet usage in families; 3) the number of crime reports; 4)the average salary; 5) The density of cultural institutions per square km. 

**The aims of CRAWCI Project:**
1. Creating a new mashup (final dataset) by aligning acquired datasets.
2. Producing the final dataset as a 5-star Open Data, following the principles of suggested a 5-star deployment scheme:

- Make your data available on the Web under an open license.
- Make it available as structured data (machine-readable data) (e.g. Excel)
- Make it available in a non-proprietary open format (CSV)
- Use a single data model to publish data on the Web: RDF 
- Link RDF to provide context

3. Visualizing the result by creating an explorable and clickable map.

### 2.1 How CRAWCI can contribute to E-Governance

Advertisements and promotions among citizens to make awareness of the importance of the presence of cultural institutions such as theaters where there are not available that can be deduced from the crime rate can be interesting for the municipalities.

  - Increase awareness
  - Opportunities for information sharing
  - Inspire public participation and collaboration  in a way that enables people to both understand what their governments do and to influence its decisions
  - Greater transparency and accountability
  - Support innovation  in processes of governance
  - Bring the delivery of public services to a new level


## 3. Original datasets and mushup dataset

### D1

I.Stat, Reddito netto: Regioni e tipo di comune, viewed 14 November 2019, http://dati.istat.it/Index.aspx?QueryId=22919

License: Creative Commons License – Attribution – 3.0 https://www.istat.it/it/note-legali

Content description: The dataset provides data about average annual income of families in eur per region.

### D2

I.Stat, Delitti denunciati dalle forze di polizia all'autorità giudiziaria, viewed 14 November 2019,  
http://dati.istat.it/Index.aspx?DataSetCode=DCCV_DELITTIPS

License: Creative Commons License – Attribution – 3.0 https://www.istat.it/it/note-legali

Content description: The datasets provide information on a number of crimes reported by the police to the judicial authority.

### D3

MiBACT, Luoghi della cultura, electronic dataset, Gli Open Data, viewed 14 November 2019, http://dati.beniculturali.it/lodview/resource/datasetLuoghiDellaCultura.html 

License: https://creativecommons.org/licenses/by/3.0/

Content description: This dataset lists cultural institutions in Italy providing information about their location, identification and services.

In order to extract the data we used the [SPARQL endpoint](http://dati.beniculturali.it/sparql) of dati.beniculturali.it by running the following query:

```sparql
select * where {

 select distinct ?s as ?subject

 ?Nome_Istituzionale
 ?Descrizione
 ?Identifier
 ?Latitudine
 ?Longitudine
 ?Disciplina
 ?Indirizzo
 ?Codice_postale
 ?Comune
 ?Provincia
 ?Prenotazioni
 ?Orari_di_apertura
 ?Telefono
 ?Fax
 ?Email
 ?WebSite
 str(?Biglietti) as ?Biglietti
 ?Servizi

 where {

  graph <http://dati.beniculturali.it/mibact/luoghi> {

   ?s rdf:type cis:CulturalInstituteOrSite ;
      cis:institutionalCISName ?Nome_Istituzionale .
   optional { ?s l0:description ?Descrizione }
   optional { ?s l0:identifier ?Identifier }
   optional { ?s geo:lat ?Latitudine }
   optional { ?s geo:long ?Longitudine }
   optional { ?s cis:hasDiscipline [l0:name ?Disciplina] }
   optional {
    ?s cis:hasSite [cis:siteAddress ?address ] .
    optional { ?address clvapit:fullAddress ?Indirizzo }
    optional { ?address clvapit:postCode ?Codice_postale }
    optional { ?address clvapit:hasCity [rdfs:label ?Comune] }
    optional { ?address clvapit:hasProvince [rdfs:label ?Provincia] }
   }
   optional {?s accessCondition:hasAccessCondition [rdf:type accessCondition:Booking ;
                                                    rdfs:label ?Prenotazioni] }
   optional {?s accessCondition:hasAccessCondition [rdf:type accessCondition:OpeningHoursSpecification ;
                                                    l0:description ?Orari_di_apertura ] }
   optional {
    ?s smapit:hasOnlineContactPoint ?contactPoint .
    optional { ?contactPoint smapit:hasTelephone [smapit:hasTelephoneType <https://w3id.org/italia/controlled-vocabulary/classifications-for-public-services/channel/031> ;
                                                  smapit:telephoneNumber ?Telefono] }
    optional { ?contactPoint smapit:hasTelephone [smapit:hasTelephoneType <https://w3id.org/italia/controlled-vocabulary/classifications-for-public-services/channel/033> ;
                                                  smapit:telephoneNumber ?Fax] }
    optional { ?contactPoint smapit:hasEmail [smapit:emailAddress ?Email] }
    optional { ?contactPoint smapit:hasWebSite [smapit:URL ?WebSite] }    
   }   
   optional {
    ?s potapit:hasTicket ?ticket .
    ?offer potapit:includes ?ticket ;
           potapit:hasPriceSpecification [potapit:hasCurrencyValue ?Biglietti]
   }
   optional { ?s cis:providesService [l0:name ?Servizi] }
  }
 }
 order by ?s

}
limit 100
offset 0
```

### D4
  
I.Stat, Internet: access and type of use, viewed 14 November 2019
http://dati.istat.it/Index.aspx?QueryId=22994&lang=en

License: Creative Commons License – Attribution – 3.0 https://www.istat.it/it/note-legali

Content description: This dataset shows the percentage of internet use in families by regions

### D5

DatiOpen.it, Mappa dei teatri in Italia, viewed 14 November 2019
http://www.datiopen.it/it/opendata/Mappa_dei_teatri_in_Italia

License: Open Database License https://opendatacommons.org/licenses/odbl/

Content description: This dataset shows the number of theaters region by region in Italy.

### D6 (Mashup)

CRAWCI Project, The final dataset, created 15 November 2019
CSV: https://github.com/simayguzel/crawci/blob/master/dataset/crawciopendata.csv
RDF: https://github.com/simayguzel/crawci/blob/master/dataset/dataset.rdf

License: Open Data License v2.0 https://www.dati.gov.it/content/italian-open-data-license-v20">Italian

Content description: This dataset includes1) the number of theaters; 2)the percentage of internet usage in families; 3) the number of crime reports; 4)the average salary; 5) The density of cultural institutions per square km.  The result will be presented as an explorable map that allows users to visualize all the data about regions. 

Methodology: The mashup of datasets D1, D2, D4, D5 was done semi-automatically using Python scripts and the library Pandas, which required a CSV version of the datasets as an input. The developed script firstly dropped the unnecessary columns and then the datasets are aligned through the properties "Theaters", "AvarageIncome", "DifuseofInternet", "CriminalReports" and "CulturalInstitutions".

Here is the Python script developed to drop the columns(an example for one of the datasets):

```
import pandas as pd
import numpy as np
import csv
df = pd.read_csv('dataset1.csv')
df.head()
to_drop = ['PRAF',
           'RDPR',
           'Data e ora inserimento']
df.drop(to_drop, inplace=True, axis=1)

df.to_csv(r'cleaned-data1.csv', index=False)



```
Here is the Python script developed to align the datasets:
```
import pandas as pd


def Aligner(cleaned-data1,cleaned-data2,outputdata,area):
    a = pd.read_csv(cleaned-data1,encoding='utf-8')
    b = pd.read_csv(cleaned-data2,encoding='utf-8')
    aligned = a.merge(b, on=area)
    aligned.to_csv(outputdata,index=False)
```

### D7 (Types of crimes)

CRAWCI Project, The final dataset, created 15 November 2019
CSV: https://github.com/simayguzel/OpenDataCRAWCI/blob/master/dataset%20and%20rdf/typesofcrimes.csv
RDF: https://github.com/simayguzel/OpenDataCRAWCI/blob/master/dataset%20and%20rdf/crimedataset.rdf
License: Open Data License v2.0 https://www.dati.gov.it/content/italian-open-data-license-v20">Italian 

Content description: This dataset contains the total number of reports of all the types of crimes in Italian regions. 

Methodology: **D7** derives from **D2**, the cleaning of which was done semi-automatically using Python scripts and the library Pandas mentioned above. Hence, we managed to obtain the data of our interest, specifically about regions, not cities, for 2016.  However, since the original **D2** does not have a consistent order, there was a need for its manual curation. 

## 4. Quality analysis of the datasets 

This section considers the necessary requirements, established according to the "Linee guida per la valorizzazione del patrimonio informativo pubblico" by AGID https://docs.italia.it/italia/daf/lg-patrimonio-pubblico/it/bozza/aspettiorg.html#qualita-dei-dati). The four characteristics to control the level of information quality are:

- **accuracy** (syntactic and semantic) - the data, and its attributes, correctly represent the real value of the concept or event to which it refers;
- **coherence** - the data, and its attributes is not contradictory to other data regarding the context of the use of the owner administration;
- **completeness** - the data is exhaustive for all its expected values and with respect to the relative entities (sources) that contribute to the definition of the procedure;
- **currentness** (or timeliness of updating) - the data, and its attributes is of the "right time" (it is updated) with respect to the procedure to which it refers.

<table>      
<col width="20%" />      
<col width="20%" />      
<col width="20%" />      
<col width="20%" />      
<col width="20%" />      
<tbody>      
<tr class="odd">      
<td align="left"><p></p></td>      
<td align="left"><p>Accuracy</p></td>      
<td align="left"><p>Completeness</p></td>      
<td align="left"><p>Coerenza</p></td>      
<td align="left"><p>Curentness</p></td>      
</tr>      
<tr class="even">      
<td align="left"><p>D1</p></td>      
<td align="left"><p>YES</p></td>      
<td align="left"><p>YES</p></td>      
<td align="left"><p>No See Point 1</p></td>      
<td align="left"><p>YES</p></td>      
</tr>      
<tr class="odd">      
<td align="left"><p>D2</p></td>      
<td align="left"><p>YES</p></td>      
<td align="left"><p>YES</p></td>      
<td align="left"><p>No See Point 2</p></td>      
<td align="left"><p>YES</p></td>      
</tr>      
<tr class="even">      
<td align="left"><p>D3</p></td>      
<td align="left"><p>YES</p></td>      
<td align="left"><p>YES</p></td>      
<td align="left"><p>YES</p></td>      
<td align="left"><p>No See Point 3</p></td>      
</tr>
<tr class="even">      
<td align="left"><p>D4</p></td>      
<td align="left"><p>YES</p></td>      
<td align="left"><p>YES</p></td>      
<td align="left"><p>No See Point 4</p></td>      
<td align="left"><p>YES</p></td>      
</tr>
</tr>
<tr class="even">      
<td align="left"><p>D5</p></td>      
<td align="left"><p>YES</p></td>      
<td align="left"><p>YES</p></td>      
<td align="left"><p>No See Point 5</p></td>      
<td align="left"><p>YES</p></td>      
</tr>        
</tbody>      
</table>      

1. D1 makes arbitrary use of uppercase and lowercase.

2. D2 makes arbitrary use of uppercase and lowercase.

3. D3 does not feature up-to-date information regarding Sardinia provinces, which changed in 2016 going from a total of 8 to a total of 4 (see Legge Regionale 4 Febbraio 2016 n.2). 
4. D4 makes arbitrary use of uppercase and lowercase.s

5. D5 makes use of integer values for indicating Comune, Provincia, Regione without a complementary explanation. 

## 5. Ethical-legal analysis

This analysis is designed to assess compliance with legal and ethical aspects in accordance with European, state and local regulations and compliance with good practices relating to publication in open data.

The analysis pays particular attention to aspects related to privacy, licenses, and interest for the purpose of creating a service that balances the public function, transparency and rights of individual citizens.

### 5.1 Legal checklist


| | To check | D.1|  D.2 | D.3 | D4 | D5 | D6 | D7 | 
| ----------- | --------| ------|--------|-------|---------|---------|---------|---------|
| **Privacy issues** | 1.1 Is the dataset free of any personal data as defined in the Regulation (EU) 2016/679? |yes |yes| yes | yes| yes| yes|yes|
| | 1.2 Is the dataset free of any indirect personal data that could be used for identifying the natural person? If so, is there a law that authorizes the PA to release them? Or any other legal basis? Identify the legal basis. |yes |yes|yes  |yes | yes| yes|yes|
| | 1.3 Is the dataset free of any particular personal data (art. 9 GDPR)? If so is there a law that authorizes the PA to release them? |yes |yes|yes  |yes | yes| yes|yes|
| | 1.4 Is the dataset free of any information that combined with common data available on the web, could identify the person? If so, is there a law that authorizes the PA to release them?  |yes |yes|yes  |yes | yes| yes|yes|
| | 1.5 Is the dataset free of any information related to human rights (e.g. refugees, witness protection, etc.)? |yes |yes|yes  |yes | yes| yes|yes|
| | 1.6 Do you use a tool for calculating the range of the risk of deanonymization? Do you anonymize the dataset? With which technique? Did you check the three mandatory parameters: singling out, linking out, inference out?  |/ |/|/|/|/|/|/|
| | 1.7 Are you using geolocalization capabilities? Do you check that the geolocalization process can’t identify single individuals in some circumstances? | no|no|no|no|no|no|no|
| |1.8 Did you check that the open data platform respect all the privacy regulations (registration of the end-user, profiling, cookies, analytics, etc.)? | yes|yes|yes|yes|yes|yes|yes|
| |1.9 Do you know who are in your open data platform the Controller and Processor of the privacy data of the system?  |yes |yes |yes |yes |no |yes |yes|
| |1.10 Where the datasets are physically stored (country and jurisdiction)? Do you have a cloud computing platform? Do you have checked the privacy regulation of the country where the dataset are physically stored? (territoriality) |/ |/|/|/|/|/|/|
| **Intellectual Property Rights of the dataset** | | |
| | 2.1 Do you have created and generated the dataset ? | yes| yes| yes |yes|yes| yes| yes|
| | 2.2 Are you the owner of the dataset? Who is the owner? |no-ISTAT|no-ISTAT|no- MIBAC|no-ISTAT|no-DatiOpen|yes|yes|
| | 2.3 Are you sure to not use third party data without the proper authorization and license ? Are the dataset free from third party licenses or patents? | yes |yes| yes| yes|yes|yes|yes|
| | 2.4 Do you have checked if there are some limitations in your national legal system for releasing some kind of datasets with an open license? | yes |yes| yes| yes|yes|yes|yes|
| **License** | | |
| | 3.1 Do you release the dataset with an open data license? In case of the use of CC0 do you check that you have all the right necessary for this particular kind of license (e.g., jurisdiction)?| yes |yes| yes| yes|yes|yes| yes|
| | 3.2 Do you include the clause: "In any case the dataset can’t be used for re-identifying the person" ?| no|no|no|no|no|yes|yes|
 | | 3.3 Do you release the API (in case you have) with an open source license no |no |no |no |no |yes |no|no|
| **Limitations on public access** | | |
| | 4.1 Do you check that the dataset concerns your institutional competences, scope and finality? Do you check if the dataset concerns other public administration competences? |yes|yes|yes|yes|yes|yes|yes|
| | 4.2 Do you check the limitations for the publication stated by your national legislation or by the EU directives ? |yes|yes|yes|yes|yes|yes|yes|
| |4.3 Do you check if there are some limitations connected to the international relations, public security or national defence ?|/|/|/|/|/|yes|yes|
| |4.4 Do you check if there are some limitations concerning the public interest ?|/|/|/|/|/|yes|yes|
| |4.5 Do you check the international law limitations ?|/|/|/|/|/|yes|yes|
| |4.6 Do you check the INSPIRE law limitations for the spatial data?|/|/|/|/|/|yes|yes|
| **Economical Conditions** | | |
| | 5.1 Do you check that the dataset could be released for free ? |yes|yes|yes|yes|yes|yes|yes|
| | 5.2 Do you check if there are some agreements with some other partners in order to release the dataset with a reasonable price ? |yes |yes|yes|yes|yes|yes|yes|yes|
| |5.3 Do you check if the open data platform terms of service include a clause of “non liability agreement” regarding the dataset and API provided ? |yes |yes |yes |yes |yes |yes |yes|
| |5.4 In case you decide to release the dataset to a reasonable price do you check if the limitation imposed by the new directive 2019/1024/EU are respected ? Are you able to calculate the “marginal cost”? Are you able to justify the “reasonable return on investment” limited to cover the costs of collection, production, reproduction, dissemination, preservation and rights clearance? There is a national law that justify your public administration to apply the “reasonable return of investment”?|yes|yes|yes|yes|yes|yes|yes|
| | 5.5 In case you decide to release the dataset to a reasonable price do you check the e-Commerce directive1 and regulation?|/|/|/|/|/|/|/|
| **Temporary aspects** | | |
| |6.1 Do you have a temporary policy for updating the dataset ? |/|/|/|/|/|/|/|
| | 6.2 Do you have some mechanism for informing the end-user that the dataset is updated at a given time to avoid mis-usage and so potential risk of damage ?|/|/|/|/|/|/|/|
| | 6.3 Did you check if the dataset for some reason can’t be indexed by the research engines (e.g. Google, Yahoo, etc.) ?|/|/|/|/|/|/|/|
| |6.4 In case of personal data, do you have a reasonable technical mechanism for collecting request of deletion (e.g. right to be forgotten)?|/|/|/|/|/|/|/|

The Datasets do not include any personal information of individuals since no attributes about individuals are present. Moreover, we did not detect any data that would fit the concept of personal data according to the Article 29 Working Party Opinion 4/2007 (https://ec.europa.eu/justice/article-29/documentation/opinion-recommendation/files/2013/wp203_en.pdf) “data relates to an individual if it refers to the identity, characteristics or behavior of an individual or if such information is used to determine or influence the way in which that
person is treated or evaluated” 
 
Hence, identity cannot be inferred. What is more, datasets are not cross-referenced and not connected between other databases and datasets. We have not determined threats related to how information can be identified and connected to specific individuals.

### 5.2 Licenses

D1, D2, D3, and D4 are licensed under Creative Commons License(https://creativecommons.org/licenses/by/3.0/) – Attribution – 3.0 and D5 is licensed under the Open Data License (ODL) v2.0(https://opendatacommons.org/licenses/odbl/), which is very similar to a CC-BY 4.0. Each dataset is accompanied by a clear license declaration. The content of the website is covered by the "All rights reserved" copyright statement. 

Our final dataset has an open licence which allows others to republish the content or data on their own website, to derive new content or data from yours, to make money by selling products that use your content or data, to republish the content or data while charging a fee for access as long as the reusers give attribution or share-alike). Our creative work has Open Data License v2.0(https://www.dati.gov.it/content/italian-open-data-license-v20">Italian). 

## 6. Technical analysis 

### **D1, D2, D4**

Datasets **D1, D2, D4** are available in English and Italian languages in multidimensional tables which users can export in **.xls, .csv** formats.  Default format: **Comma (,)** separated with codes and labels in separate columns.  The datasets can be can customised by choosing Text File format: **Comma ( , ); Pipe ( | ); Tabullator.**

A CSV should normally follow RFC 4180(https://tools.ietf.org/html/rfc4180), however, it is not followed most of the time. While analyzing the CSV files of D1, D2 and D4, we have realized that each row end with ",, which does not suit to the CSV format. 

None of the datasets **D1, D2, D4**  was published in. RDF format which gives us a reason to consider all the original datasets as 3-star Open Data.

Finally, **D1, D2, D4** are consistent, all of the datasets follow a well-defined structure and include explanations for the abbreviations.  However, Datasets **D1, D2, D4** make arbitrary use of uppercase and lowercase. Moreover, **D2** list types of crimes in different order to different regions, which made it difficult to manipulate data while extracting necessary information. 

### **D3** 

The **D3** Dataset сan be displayed in tabular format, accessed directly through the URL or downloaded in the following distribution formats: **rdf,turle,json**.

### **D5** 

The original D5 can be downloaded as **.xlsx, .xml, .json,**  or can be exported as **CSV** which can be customized by choosing necessary columns. The dataset is also available in .RDF format but the file is damaged and cannot be opened in a proper way. 

Dataset D5 makes arbitrary use of uppercase and lowercase. Also, D5 has empty rows that lack information about theatres and makes harder data processing and data extraction.

Ultimately, none of the datasets were published in RDF format which gives us a reason to consider all the original datasets as 3-star Open Data. What is more, there is no indication about the encoding of the files (if it's ASCII, ISO-8859-1), despite this is encouraged by the ["Linee guida per la valorizzazione del patrimonio informativo pubblico" by AGID](https://www.agid.gov.it/it/agenzia/stampa-e-comunicazione/notizie/2017/08/03/open-data-online-linee-guida-valorizzazione-del-patrimonio-informativo-pubblico). We consider this problem as an acute one since the wrong encoding can potentially lead to various problems in the automatic data processing, for example,  incorrect data results since some cells may be skipped while processing data.

### 6.1 Analysis Summary

| Id | Problem description | Severity (1-3) | Type (Syntax/Semantics) | Proposed solution |
|-------------------------------|----------------------------|----------------|-------------------------|----------------------------|
| D1, D2, D4 | Encoding of the dataset not specified  | 1.5 | Technical | Include a note on the download page of the dataset stating its encoding |
| D1 | Violations of the common format for Comma-Separated Values (CSV) | 3 | Technical, Syntax | Follow the Common Format RFC 4180 (https://tools.ietf.org/html/rfc4180 |
| D3 | Incorrect information about Sardinia's provinces | 2.5 | Outdated content | Combination of manual and automatic methods to redistribute data in the correct provinces |
| D4 | The absence of the well-defined structure | 2 | Technical | List all types of crime in order following a defined structure |
| D5 | Empty rows| 2 | Semantics | Fill in the empty rows manually with names of the theatres  |
| D1, D2, D3, D4, D5 | No RDF | 2 | Technical, Syntax | Creating RDF for datasets | 

## 7. Creating the CRAWCI Ontology

An ontology is a detailed model of a slice of reality which is based on the facts that we know about that reality. This model is a description of some of the things and some of the relationships between the things that are known about that reality.

We faced the need to create our own ontology once we realized that there was a lack of vocabularies for the description of statistical and crime data that would suit the needs of our project. Even though we managed to reuse some namespaces as(**ds:total_crime_rate**; **ds:average_salary**; **cis:hostsCulturalEvent**), those vocabularies were not enough to record the nature of our data and sufficiently describe it on the Web. 

The **CRWACI Ontology** modeling was based on the analysed and extracted data while creating our mashup datasets. Hence, it has been developed in a manner that is intended to promote a shared understanding of cultural heritage information and statistical data. We also paid special attention to modelling crime-related namespaces in order to provide information on the crime situation in the Italian regions observing practice of different crime types. In this way, it helps to mediate between different sources of information on the Semantic Web.

The full Ontology documentation and visualization can be found here: https://github.com/simayguzel/OpenDataCRAWCI/tree/master/myDocumentation

### 7.1 The CRAWCI Ontology Visualisation

To visualize our ontology we used <a href="http://rhizomik.net/">Rizhomik tool.

The CRAWCI Ontology **visualisation** can be found <a href="https://github.com/simayguzel/crawci/blob/master/crawciont.svg">here.

The CRAWCI Ontology **clsss hierarchy** can be found <a href="https://github.com/simayguzel/crawci/blob/master/classhierarchy.svg">here.

The CRAWCI Ontology **graph** can be found <a href="https://github.com/simayguzel/crawci/blob/master/crawcigraph.svg">here.s


## 8. Mashup Data Curation.

CRAWCI Mashup datasets **D6** and **D7** were produced as a 5-star Open Data, following the principles of a 5-star deployment scheme for data to be published on the Web. Please find below the detailed explanations.


### 8.1 CSV to RDF Conversion

To convert our data we used csv2rdf which is a Java-based application, which relies on Apache Jena to convert tabular data to RDF. https://github.com/anuzzolese/csv2rdf/blob/master/README.md

The binaries can be obtained by compiling the source code with MAVEN from the command line, i.e.

### Compiling

```bash 
mvn clean install
```
Once the source code have been compiled a JAR named stlab.csv2rdf-1.0.jar is available in the target folder.

### Usage

The JAR stlab.csv2rdf-1.0.jar can be used as a command-line tool.
The synopsis is the following

```bash
java -jar stlab.csv2rdf-1.0.jar [OPTIONS] CSV_FILE
```

The options available are the following:

* -s,--separator &lt;char&gt;   
The character used as separator within the CSV file (e.g. , or ;).

* -m,--mapping &lt;file&gt;   
 A file providing the mapping between CSV columns and the properties of our target CRAWCI ontology.
    
 The file contains a set of key=value lines, where each key represents a column position in the source CSV (the counting of positions starts from index 1) and each value is a pair property-datatype composed of property URI form a target ontology or vocabulary and a datatype URI. The property-datatype pairs are separated by the character '>'. The data type is optional, hence it is possible to provide the property URI only without any data type. We remark that if no data type is provided, then the tool tries to infer the more appropriate data type for the value to transform to RDF. 

 Additionally, the following file, named *mapping* and containing key=property>datatype pairs, define the mapping to be used in order to generate the properties.
 
 ```java
1. http://www.semanticweb.org/simayguzel/ontologies/2019/10/crawci#Region
2. http://www.semanticweb.org/simayguzel/ontologies/2019/10/crawci#hasTheater
3. http://www.semanticweb.org/simayguzel/ontologies/2019/10/crawci#hasAverageSalary
4. http://www.semanticweb.org/simayguzel/ontologies/2019/10/crawci#hasInternetDifusion
5. http://www.semanticweb.org/simayguzel/ontologies/2019/10/crawci#hasCriminalReport
6. http://www.semanticweb.org/simayguzel/ontologies/2019/10/crawci#hasDensity
7. http://www.semanticweb.org/simayguzel/crawci#hasCrimeLevel
9. http://www.semanticweb.org/simayguzel/crawci#hasInternetDiffusionLevel
10.http://www.semanticweb.org/simayguzel/ontologies/2019/10/crawci#hasNofTheater
11.http://www.semanticweb.org/simayguzel/crawci#hasSalaryLevel

 ``` 
 
 Hence, the following line provides the example about how to use the tool from the command line in order to obtain RDF from CSV and saving its content into a file named *musicians.ttl*. We suppose that the input CSV is actually a tab-separated file.
 ```bash
 java -jar stlab.csv2rdf-1.0.jar -s '\t' -m mapping -o crawci.ttl cleandata.csv
 ```
 
 The execution of the tool with the arguments as provided produced the following RDF serialized by using the TURTLE syntax.

**D6**: https://github.com/simayguzel/OpenDataCRAWCI/blob/master/dataset-rdf/dataset.rdf
**D7**: https://github.com/simayguzel/OpenDataCRAWCI/blob/master/dataset-rdf/crimedataset.rdf


### 8.2 Updating the dataset over time

We do not plan to update CRAWCI datasets as it considers the specific year, namely 2016. However, it would be interesting to analyse other years to see the results in dynamic.


## 9. Handling the visualization (technical description)

In order to visualize the data the following libraries were used:

* **Bootstrap**: Build responsive, mobile-first projects on the web with the world's most popular front-end component library.

### 9.1 Cultural institutions
N. of cultural institutions divided by Km^2.

For Italy, each region, each province we established the following threshold:

-one museum icon if < 0.0224 (Italian average presence of cultural institutions/Km^2);
-two museum icons if >= 0.0224 and < 0.0448;
-three museum icons if >= 0.0448.

## 10. Summary

This part presents the results of the data analysis. We ordered the regions descendingly from the first region featuring the highest value to the last one with the lowest value.

### 10.1 Average Salary

According to the obtained data, **Lombardia** is the region with the biggest salary, while **Sicilia** has the lowest one:

1. Lombardia (**the biggest** average salary)
2. Emilia-Romagna
3. Trentino Aldo Adige
4. Veneto
5. Toscana
6. Friuli-Venezia Giulia
7. Marche
8. Lazio
9. Liguria
10. Umbria
11. Piemonte
12. Valle d'Aosta
13. Puglia
14. Abruzzo
15. Sardegna
16. Molise
17. Basilicata
18. Campania
19. Calabria
20. Sicilia

### 10.2 Total number of theatres

According to the obtained data, **Lombardia** is the region with the highest number of theatres, while **Molise** has the lowest one: 

1. Lombardia
2. Veneto
3. Emilia-Romagna
4. Toscana
5. Sicilia
6. Piemonte
7. Trentino Aldo Adige
8. Lazio
9. Marche
10. Puglia
11. Friuli-Venezia Giulia
12. Calabria
13. Liguria
14. Sardegna
15. Campania
16. Umbria
17. Abruzzo
18. Basilicata
19. Valle d'Aosta
20. Molise

### 10.3 Diffusion of the Internet

According to the obtained data, **Lombardia** is the region with the highest percentage of diffusion of the internet, while **Calabria** has the lowest one:

1. Lombardia
2. Friuli-Venezia Giulia
3. Lazio
4. Veneto
5. Trentino Aldo Adige
6. Sardegna
7. Emilia-Romagna
8. Toscana
9. Marche
10. Abruzzo
11. Valle d'Aosta
12. Piemonte
13. Umbria
14. Liguria
15. Campania
16. Molise
17. Basilicata
18. Puglia
19. Sicilia
20. Calabria

### 10.4 Total number of criminal reports

According to the obtained data, **Lombardia** is the region with the highest crime rate, while **Valle d'Aosta** has the lowest one:

1. Lombardia
2. Lazio
3. Emilia-Romagna
4. Campania
5. Piemonte
6. Sicilia
7. Toscana
8. Veneto
9. Puglia
10. Liguria
11. Calabria
12. Sardegna
13. Marche
14. Abruzzo
15. Friuli-Venezia Giulia
16. Trentino Aldo Adige
17. Umbria
18. Basilicata
19. Molise
20. Valle d'Aosta


### 10.5 Cultural institutions

According to the obtained data, **Liguria** is the region with the highest density of cultural institutions, while **Valle d'Aosta** has the lowest one. The regions order descendingly according to the total number:

1. Liguria
2. Marche
3. Toscana
4. Umbria
5. Lazio
6. Emilia-Romagna
7. Campania
8. Friuli-Venezia Giulia
9. Piemonte
10. Lombardia
11. Abruzzo
12. Calabria
13. Molise
14. Veneto
15. Puglia
16. Sardegna
17. Sicilia
18. Basilicata
19. Trentino Aldo Adige
20. Valle d'Aosta

### 10.6 Types of crimes

Our final dataset features 56 types of crimes, after analyzing all of them we ended up paying more attention to some crime types. For example, **theft of art objects** which obviously leads to the conclusion that **the presence of cultural institutions** that have valuable instances in their collections is **directly connected to the potential threat of crime**. Below are the top 7 regions featuring the highest number of **theft of art objects**:

1. Lombardia
2. Toscana
3. Lazio
4. Campania
5. Emilia-Romagna
6. Sicilia

**intellectual property violations** are spread mostly in the regions, many of which represent the highest cultural value in our dataset, ex. **Lazio, Campania** have the highest density of cultural institutions. Also, **Sicilia, Lazio** and **Lombardia** feature the highest number of theatres, which lead us to the conclusion that regions with a **better presence of cultural organizations** can be connected to number of **Intellectual property violations** that include literary works, inventions, and designs that can be considered as results of a more educated and cultural society. 

1. Campania
2. **Sicilia**
3. **Lazio**
4. Puglia
5. **Lombardia**
6. Calabria

**swindles and cyber frauds** and **cybercrime** are present in the regions, 3 of which demonstrate the higher percentage of diffusion of the Internet (**Lombardia, Lazio, Veneto**).

**swindles and cyber frauds**:

1. **Lombardia**
2. Campania
3. **Lazio**
4. Piemonte
5. Emilia-Romagna
6. **Veneto**

**cybercrime**:

1. **Lombardia**
2. Liguria
3. **Lazio**
4. Toscana
5. Piemonte
6. Emilia-Romagna

### 10.7 Correlation

In order to answer our initial question **weather, there is a strong relationship between the density of cultural institutions and(respectively) average salary, internet diffusion and the number of total criminal reports** 
and hence to approve o disapprove our hypothesis "**The presence of cultural institutions increases the average salary and dicreases the crime rate"** , we have calculated the correlation coefficients. The correlation is used in statistics to measure how strong a relationship is between two variables. The formulas return a value between **-1**(negative correlation) and **1**(positive correlation). 

By using an online tool (mathsisfun.com/data/correlation-calculator.html), Pearson's correlation is calculated by taking the results from our dataset. **X axis** - the values of **cultural institution density** and **Y axis** - the values of **average salary, internet diffusion, the number of total criminal reports** one by one. 

- Pearson's correlation between the cultural institution density and average salary(the first values in parenthesis stand for the C.I. density while the second ones are for the annual average salary:


 ```bash
 (0.0246,34.290) (0,33.504) (0.0511,35.866) (0.0238,40.459) (0.33,39.674) (0.0131,39.521) (0.0261,37.483) (0.0265,40.187)(0.0341,38.202) (0.0315,35.860) (0.0413,36.687) (0.0312,36.636) (0.0224,31.712) (0.0132,28.581) (0.0263,27.778) (0.0129,31.726) (0.0083,28.578) (0.0132,26.852) (0.0121,25.936) (0.0125,30.332)
  ```
  
  - Correlation between the density of cultural institutions and average salary: **0.35698**. Positive correlation is obtained which proves our hypothesis: when the presence of C.I. is dense, the average salary increases, too.
  
  
![alt text](salary-ci.png)


- Pearson's correlation between the cultural institution density and internet diffusion(the first values in parenthesis stand for the C.I. density while the second ones are for the internet diffusion:

 ```bash
(0.0246,69.1) (0,69.4) (0.0511,65.2) (0.0238,73,7) (0.33,72.5) (0.0131,72.6) (0.0261,73.1) (0.0265,71.9)(0.0341,71.9) (0.0315,69) (0.0413,70) (0.0312,72.9) (0.0224,70) (0.0132,63.2) (0.0263,64.4) (0.0129,62.4) (0.0083,62.7) (0.0132,59.4) (0.0121,60.6) (0.0125,72.4)
 ```
 
   - Correlation between the density of cultural institutions and internet diffusion : **0.25864**. Like average salary, there is a positive correlation between the C.I. density and internet diffusion and it can be deduced that the denser cultural instiution presence is, the wider internet spread is.  
 ![alt text](internet-ci.png)

- Pearson's correlation between the cultural institution density and criminal reports(the first values in parenthesis stand for the C.I. density while the second ones are for the number of criminal reports:

 ```bash
(0.0246,207.885) (0,4.085) (0.0511,79.898) (0.0238,475.194) (0.33,620) (0.0131,169.999) (0.0261,35.552) (0.0265,229.630)(0.0341,176.246) (0.0315,30.108) (0.0413,47.067) (0.0312,276.255) (0.0224,43.136) (0.0132,8.205) (0.0263,222.685) (0.0129,149.334) (0.0083,13.570) (0.0132,61.137) (0.0121,176.318) (0.0125,47.465)
 ```
 
  - Correlation between the density of cultural institutions and the number of total criminal reports: **0.69353**. So, there is a positive correlation between them which means that when there is a high density of cultural instiution, criminality increases which also proves our hypothesis.  
![alt text](crime-ci.png)


Therefore, our hypothesis **The presence of cultural institutions increases the average salary and dicreases the crime rate** was not fully proved because according to the nature of our hypothesis we were supposed to have negative correlation between the density of cultural institutions and crime rate. Instead, the correlation turned out to be not only postive but the strongest one among our data. 
