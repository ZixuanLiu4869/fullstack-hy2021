# Assignment 1 Report #

## Part 1 Design ##

1. **Explain your choice of types of data to be supported and technologies for mysimbdp-coredms.**

     For this project, I used COVID-19 dataset from EU([https://data.europa.eu/data/datasets/covid-19-coronavirus-data?locale=en](https://data.europa.eu/data/datasets/covid-19-coronavirus-data?locale=en)) , thus I choose to support semi-structured data, which is structured but not rigid. I used MongoDB for mysimbdp-coredms. The idea of using MongoDB is that replication of data across multiple hosts and servers is supported by MongoDB, which makes the data highly available. Moreover, MongoDB is a good choice for semi-structured data storage.

2. **Design and explain interactions between main components in your architecture of mysimbdp.**
   
The figure of main components and interactions is as follow:
<img width="829" alt="绘图1" src="https://user-images.githubusercontent.com/91376924/154082925-cdedcd44-17f7-41a5-ac38-b60c1f08634e.png">
