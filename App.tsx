import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  TouchableOpacity,
  Button,
} from 'react-native';

type SectionProps = PropsWithChildren<{}>;

function Section({children}: SectionProps): React.JSX.Element {
  return <View style={styles.sectionContainer}>{children}</View>;
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: 'white',
    color: 'black',
  };

  type SelectedBrickProps = {
    label: string;
    value: number;
    logo?: string;
  };

  const [total, setTotal] = useState<number>(0);
  const [amount, setAmount] = useState<string>('');
  const [selectedBrick, setSelectedBrick] = useState<SelectedBrickProps>();

  function calculateTotal() {
    const amountInt = Number(amount);
    if (!selectedBrick || !amount) {
      return;
    }

    const firstInt = amountInt / 1000;
    const final = firstInt * selectedBrick.value;

    setTotal(Math.round(final * 100) / 100);
  }

  const options = [
    {
      label: 'Modular',
      value: 6.86,
    },
    {
      label: 'Queen 8”',
      value: 5.5,
    },
    {
      label: 'Engineer',
      value: 5.76,
    },
    {
      label: 'Kind Size',
      value: 4.55,
    },
    {
      label: 'Utility',
      value: 3,
    },
    {
      label: 'Closure',
      value: 4.5,
    },
    {
      label: 'Norman',
      value: 4.57,
    },
    {
      label: 'logo',
      logo: './assets/images/logo.png',
      value: 0,
    },
  ];

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        <Section>
          <View style={styles.totalWrapper}>
            <View style={styles.dollarSignWrapper}>
              <Text style={styles.dollarSign}>$</Text>
              <Text style={styles.totalAmount}>{total}</Text>
            </View>
            <Text style={styles.perSquareFoot}>per square foot</Text>
          </View>
        </Section>

        <View>
          <Section>
            <TextInput
              style={styles.input}
              onChangeText={setAmount}
              value={amount}
              keyboardType="numeric"
            />

            <Text style={styles.text}>Unit Price</Text>

            <View style={styles.buttons}>
              {amount !== '' && selectedBrick ? (
                <>
                  <Button
                    color={'#FF0000'}
                    title="Clear"
                    onPress={() => {
                      setTotal(0);
                      setAmount('');
                      setSelectedBrick(undefined);
                    }}
                  />
                  <Button
                    color={'#0000FF'}
                    title="Calculate"
                    onPress={calculateTotal}
                  />
                </>
              ) : null}
            </View>
          </Section>
          <Section>
            <View style={styles.list}>
              {options.map(item => {
                if (item.label === 'logo') {
                  return (
                    <View key={item.label} style={[styles.listItem]}>
                      <Image
                        style={styles.listItemLogo}
                        source={require('./assets/images/logo.png')}
                      />
                    </View>
                  );
                }
                return (
                  <TouchableOpacity
                    key={item.label}
                    style={[
                      styles.listItem,
                      selectedBrick && selectedBrick.label === item.label
                        ? styles.listItemSelected
                        : null,
                    ]}
                    onPress={() => setSelectedBrick(item)}>
                    <Text style={styles.listItemValue}>{item.label}</Text>
                    <Text style={styles.listItemTitle}>{item.value}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Section>
        </View>
      </View>
    </SafeAreaView>
  );
}

const fontFamily = 'Oswald';
const opacity = 0.5;

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    zIndex: 1,
  },
  container: {
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  buttons: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-between',
  },
  calculate: {
    backgroundColor: 'black',
    color: 'white',
  },
  input: {
    fontFamily: fontFamily,
    fontSize: 96,
    margin: 12,
    borderBottomWidth: 2,
    borderColor: '#eeeeee',
    padding: 10,
    textAlign: 'center',
  },
  text: {
    color: 'black',
    fontFamily: fontFamily,
    opacity: opacity,
    textAlign: 'center',
  },
  perSquareFoot: {
    fontFamily: fontFamily,
    fontSize: 20,
    opacity: opacity,
    marginTop: 64,
  },
  totalWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dollarSignWrapper: {
    flexDirection: 'row',
  },
  dollarSign: {
    fontFamily: fontFamily,
    fontSize: 32,
    opacity: opacity,
    marginTop: 32,
  },
  totalAmount: {
    fontFamily: fontFamily,
    fontSize: 96,
    marginHorizontal: 12,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  listItem: {
    width: '23%',
    height: 88,
    borderColor: '#eeeeee',
    borderWidth: 2,
    borderRadius: 6,
    marginBottom: 12,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemTitle: {
    fontFamily: fontFamily,
    fontSize: 24,
    textAlign: 'center',
  },
  listItemValue: {
    fontFamily: fontFamily,
    fontSize: 12,
    opacity: opacity,
    textAlign: 'center',
  },
  listItemSelected: {
    backgroundColor: '#eeeeee',
    borderColor: 'black',
  },
  listItemLogo: {},
});

export default App;
