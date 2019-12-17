## Report: Implementation of suggested changes

This paper presents the changes that were have been made to the CRAWCI Project https://github.com/simayguzel/OpenDataCRAWCI/blob/master/CRAWCI%20Documentation.md to improve the quality of published datasets.

### Privacy violation 

This part describes the detected privacy issue regarding the dataset **D2**  (I.Stat, Delitti denunciati dalle forze di polizia all'autorità giudiziaria, viewed 14 November 2019, http://dati.istat.it/Index.aspx?DataSetCode=DCCV_DELITTIPS ). The datasets provide information on crimes reported by the police to the judicial authority.

Even though the dataset is anonymized there is a risk of identification if other attributes about an individual are released. The latter can be resulted from cross-referencing and connecting different datasets. Considering the fact that in our case some types of crimes feature very small values (ex. 3, 7), the risk of being identified even increases.  What is more, despite the anonymization techniques, data can be reidentified by using machine learning. 

For this reason, when releasing data on the Web it is of crucial importance to ensure that the risk of a privacy violation is as low as possible unless there was some other reason why privacy was not a priority (for example, there may be a public interest in the publication of some personal information,
such as the identities of suspected criminals) (Analytical Report 3: Open Data and Privacy) https://www.europeandataportal.eu/sites/default/files/open_data_and_privacy_v1_final_clean.pdf. 

Hence, it is necessary to distinguish between open data and public data which bears risks for personally identifiable information to be disclosed while achieving a particular policy. The dataset published by I.Stat presents a risk of privacy violation. Consequently, a possible solution could be not publishing the data that presents too small values and as a result, bears risks of being identified. If the data is to be published, there are two paramount aspects to consider. Firstly, evaluate the final goal and do not produce open data that could result in privacy violations. Secondly, include the impact assessment to analyze the likelihood of privacy violations.


### Data Normalization

The normalization of data was done in order to adjust values measured on different scales to a notionally common scale.

A **crime rate** was calculated by dividing the number of reported crimes by the total population of the region, of 2016 respectively; the result was multiplied by 100,000 which means the distribution of crime reports per 100, 000 population. The **types of crime** were calculated following the same scheme.

The total number of theatres was presented in our data as **the distribution of theatres** divided by the total population of the region, of 2016 respectively. 

The results in % are presented in the visualization part on the website with the accompanying explanations.

Updated csv documents can be found in dataset/rdf folder here: https://github.com/simayguzel/OpenDataCRAWCI/tree/master/dataset-rdf

### The Ontology

### RDF 

Our .rdf has been updated with namespaces from **Geonames Ontology** (http://www.geonames.org/ontology#) in order to sufficiently describe the regions without bearing the risk of referencing primarly those resources that are not reliable enough. 
As a result, we referenced Geonames links to the regions, (ex. Veneto: http://sws.geonames.org/3164604). Moreover, we used the following namespaces:

- <gn:alternateName>
- <gn:countryCode>
- <gn:locationMap>
- <gn:population>

The rdf example for Veneto region is presented below:

```
  <rdf:Description rdf:about="http://sws.geonames.org/3164604/">
      <rdfs:seeAlso "http://dbpedia.org/resource/Veneto">
      <gn:alternateName "Regione del Veneto" , "Veneto" , "Venetia">
      <gn:countryCode "IT">
      <gn:locationMap "http://www.geonames.org/3164604/regione-veneto.html">
      <gn:population>"1234079"</gn:population>
      <ds:average_salary>30332</ds:average_salary>
      <cis:hostsCulturalEvent>21</cis:hostsCulturalEvent>
      <ds:total_crime_rate>47465</dcterms:crimerate>
      <ds:internet_diffusion>72,4</ds:internet_diffusion>
  </rdf:Description>
  ```

  The updated .rdf can be found here https://github.com/simayguzel/OpenDataCRAWCI/blob/master/dataset-rdf/dataset.rdf.

  The updated .rdf of types of crimes dataset can be found here: 

### Technical issue / User Experience
