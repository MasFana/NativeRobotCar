import { StatusBar } from 'expo-status-bar';
import { Text, View, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import './global.css'
import { useEffect, useState } from 'react';


export default function App() {
  const data = [
    [['G', ''], ['-rotate-90', '▲'], ['H', '']],
    [['up', '▲'], ['pt-4', '⏣'], ['rotate-180', '▲']],
    [['I', ''], ['rotate-90', '▲'], ['J', '']]
  ];
  const [deg, setDeg] = useState(0)
  const [speed, setSpeed] = useState(5)
  const [lamp, setLamp] = useState(false)
  const [ip, setIp] = useState('192.168.4.1')

  useEffect(() => {
    const interval = setInterval(() => {
      setDeg((prevDeg) => (prevDeg + 10) % 360)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    HandleSpeed(speed)
  }, [speed])

  function upSpeed() {
    if (speed < 9) {
      setSpeed(speed + 1)
    }
  }

  function downSpeed() {
    if (speed > 0) {
      setSpeed(speed - 1)
    }
  }


  function HandleTouch(id) {
    let a = ''
    if (id === 'up') {
      a = 'F'
    } else if (id === 'rotate-180') {
      a = 'B'
    } else if (id === 'rotate-90') {
      a = 'R'
    }
    else if (id === '-rotate-90') {
      a = 'L'
    } else if (id === 'stop') {
      a = 'S'
    } else if (id === 'G') {
      a = 'G'
    }
    else if (id === 'H') {
      a = 'H'
    }
    else if (id === 'I') {
      a = 'I'
    }
    else if (id === 'J') {
      a = 'J'
    }
    else {
      a = 'S'
    }
    // console.log(`http://${ip}/?State=${a}`)
    fetch(`http://${ip}?State=${a}`)
  }

  function HandleLamp() {
    let a = ''
    if (lamp) {
      a = 'W'
    } else {
      a = 'w'
    }
    // console.log(`http://${ip}/?State=${a}`)
    fetch(`http://${ip}?State=${a}`)
  }

  function HandleSpeed(s) {
    // console.log(`http://${ip}/?State=${s}`)
    fetch(`http://${ip}?State=${s}`)
  }

  return (
    <View className={'flex-1 bg-gray-900 items-center justify-end pb-12'}>

      <View className={'relative w-full h-1/2 mb-8 flex flex-row'}>

        <TextInput className='text-white text-center text-2xl absolute border-white border-4 left-1/4 mt-4 w-1/2 h-16 rounded-xl'
          onChangeText={(text) => setIp(text)}
        >{ip}
        </TextInput>

        <View className={'flex-1 justify-end items-center w-1/3 h-full '}>

          <TouchableOpacity
            onPress={downSpeed}
            disabled={speed === 0}
          >
            <Text className='text-white text-8xl'>−</Text>
          </TouchableOpacity>

        </View>
        <View className={'flex-1 relative justify-center items-center w-1/3 h-full'}>
          <TouchableOpacity
            onPress={() => setLamp(!lamp)}
            className={`relative w-28 h-28 border-4 border-white rounded-full mb-4 items-center justify-center overflow-hidden`}
          >
            {lamp && <ImageBackground source={require('./assets/gradient.png')} style={{ width: '140%', height: '140%', position: 'absolute', top: 0, left: 0, transform: [{ rotate: `${deg}deg` }, { translateX: -0.25 * 100, }, { translateY: -0.25 * 130, }] }} />}
            <ImageBackground source={require('./assets/flash.png')} className='h-20 w-20' />
          </TouchableOpacity>

          <Text className='absolute bottom-4 text-white text-7xl'>{speed}</Text>
        </View>
        <View className={'flex-1 justify-end items-center w-1/3 h-full'}>

          <TouchableOpacity
            onPress={upSpeed}
            disabled={speed === 9}
          >
            <Text className='text-white text-8xl'>+</Text>
          </TouchableOpacity>

        </View>

      </View>

      <View className={'relative shadow-2xl w-96 h-96 rounded-3xl p-1 flex flex-row items-start justify-center overflow-hidden'}>
        <ImageBackground source={require('./assets/gradient.png')} style={{ width: '160%', height: '170%', position: 'absolute', top: 0, left: 0, transform: [{ rotate: `${deg}deg` }, { translateX: -0.25 * 750, }, { translateY: -0.25 * 450, }] }} />
        {data.map((column, columnIndex) => (
          <View key={columnIndex} className={'w-1/3 flex-1 justify-center'}>
            {column.map((item, itemIndex) => (
              <View
                key={itemIndex}
                className='w-full h-1/3 p-1'
              >
                <TouchableOpacity
                  onPressIn={() => HandleTouch(item[0])}
                  onPressOut={() => HandleTouch('')}
                  disabled={item[1] === '⏣'}
                  className={`bg-gray-900 w-full h-full items-center justify-center pt-2 ${columnIndex === 0 && itemIndex === 0 ? 'rounded-tl-2xl' : ''} ${columnIndex === 0 && itemIndex === 2 ? 'rounded-bl-2xl' : ''} ${columnIndex === 2 && itemIndex === 0 ? 'rounded-tr-2xl' : ''} ${columnIndex === 2 && itemIndex === 2 ? 'rounded-br-2xl' : ''}`}
                >
                  <Text className={`text-white font-bold text-6xl text-center ${item[0]}`}>{item[1]}</Text>
                </TouchableOpacity>
              </View>

            ))}
          </View>
        ))}
      </View>

      <StatusBar style="light" />
    </View>
  );
}
