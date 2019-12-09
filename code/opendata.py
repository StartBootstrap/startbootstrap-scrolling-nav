import pandas as pd
import numpy as np
import csv
df = pd.read_csv('dataset5.csv')
df.head()
to_drop = ['Comune',
           'Provincia',
           'Data e ora inserimento']
df.drop(to_drop, inplace=True, axis=1)

df.to_csv(r'cleaned-data5.csv', index=False)


