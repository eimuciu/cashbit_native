import React, {useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Skeleton from './Skeleton';

import {createAndSumEachCategory} from '../utils/commonFunctions';

import {
  VictoryBar,
  VictoryPie,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  VictoryAxis,
  VictoryArea,
  VictoryLine,
  VictoryTooltip,
} from 'victory-native';

const dataToRender = expense => {
  const eachCategorySummedUp = createAndSumEachCategory(expense);
  const data = [];

  for (let x in eachCategorySummedUp) {
    if (parseFloat(eachCategorySummedUp[x]) !== 0) {
      data.push({name: x, value: parseFloat(eachCategorySummedUp[x])});
    }
  }
  return data;
};

const sortByAmount = array => {
  return array.sort((a, b) => b.value - a.value);
};

const getData = expense => {
  const data = sortByAmount(dataToRender(expense)).map(item => {
    return {
      quarter: item.name.toUpperCase(),
      earnings: item.value,
    };
  });

  return data;
};

const filterByCategory = (filter, expense) => {
  return expense.filter(
    item => item.category.toLowerCase() === filter.toLowerCase(),
  );
};

colors = [
  '#e0b981',
  '#59e834',
  '#f39d05',
  '#97c632',
  '#ffc800',
  '#0C1B33',
  '#7A306C',
  '#03B5AA',
  '#DBFE87',
  '#C98BB9',
  '#FB3640',
];

const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000},
];

const DataItemOne = ({item, settings}) => {
  return (
    <View style={styles.dataItemOneWrapper}>
      <View style={styles.topItemContainer}>
        <View style={styles.topItem}>
          <Text style={{fontWeight: 'bold'}}>{item.date}</Text>
        </View>
        <View style={styles.topItem}>
          <Text style={{color: 'red'}}>
            {settings.currency}
            {parseInt(item.amount).toFixed(2).toString()}
          </Text>
        </View>
      </View>
      <View style={styles.bottomItemContainer}>
        <View style={styles.bottomItem}>
          <Text>{item.category}</Text>
        </View>
        <View style={styles.bottomItem}>
          <Text>{item.description}</Text>
        </View>
      </View>
    </View>
  );
};

const Stats = ({navigation, expense, income, settings}) => {
  const [filter, setFilter] = useState('');
  return (
    <Skeleton
      navigation={navigation}
      expense={expense}
      income={income}
      settings={settings}>
      <View style={styles.wrapper}>
        <>
          {sortByAmount(dataToRender(expense)).map((item, idx) => (
            <View style={styles.categoryItem} key={idx}>
              <Text onPress={() => setFilter(item.name)}>
                {idx + 1}. {item.name.toUpperCase()} {settings.currency}
                {item.value.toFixed(2)}
              </Text>
            </View>
          ))}
          {filter ? (
            <>
              <View style={{flex: 1, alignItems: 'center', padding: 20}}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                  {filter.toUpperCase()}
                </Text>
              </View>
              {filterByCategory(filter, expense).map((item, idx) => (
                <DataItemOne key={idx} item={item} settings={settings} />
              ))}
            </>
          ) : null}
          <View style={{paddingTop: 20, height: 500}}>
            <VictoryChart
              // theme={VictoryTheme.material}
              height={500}
              padding={{bottom: 150, right: 30, left: 60}}>
              <VictoryBar
                barWidth={20}
                data={getData(expense)}
                x="quarter"
                y="earnings"
                // colorScale={colors}
              />
              <VictoryAxis
                standalone={false}
                crossAxis
                style={{tickLabels: {angle: -45, padding: 40}}}
              />
              <VictoryAxis
                crossAxis
                dependentAxis
                standalone={false}
                style={{tickLabels: {padding: 15}}}
              />
            </VictoryChart>
          </View>
        </>
      </View>
    </Skeleton>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 5,
  },
  categoryItem: {padding: 3, backgroundColor: 'lightgreen', margin: 2},
  dataItemOneWrapper: {
    backgroundColor: 'lightyellow',
    marginTop: 2.5,
    marginBottom: 2.5,
  },
  topItemContainer: {flexDirection: 'row', justifyContent: 'space-around'},
  bottomItemContainer: {flexDirection: 'row', justifyContent: 'space-around'},
  topItem: {padding: 5, width: '50%'},
  bottomItem: {padding: 5, width: '50%'},
  chart: {
    flex: 1,
  },
});

export default Stats;
