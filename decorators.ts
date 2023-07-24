
@classDecorator
class Boat {
  @testDecorator
  color: string = 'red';
  @testDecorator
  get formattedColor(): string {
    return `This boats color is ${this.color}`;
  }
  @logError('Oops, boat was sunk')
  pilot(
    @parameterDecorator speed: string,
    @parameterDecorator generateWake: string
  ): void {
    if (speed === 'fast') {
      console.log('fast');
    } else {
      console.log('non fast');
    }
  }
}

function logError(errorMessage: string | undefined) {
  return (classPrototype: any, key: string, desc: PropertyDescriptor) => {
    const method = desc.value;
    console.log('logError classPrototype', classPrototype);
    console.log('logError key', key);
    desc.value = () => {
      // this is real decorator functionality, we create wrapper around function that can manipulate input and output
      try {
        method();
      } catch (e) {
        console.log(errorMessage ?? 'error');
      }
    };
  };
}

function testDecorator(
  classPrototype: any,
  key: string
  // desc: PropertyDescriptor
) {
  console.log('testDecorator classPrototype', classPrototype);
  console.log('testDecorator key', key);
  // console.log('desc', desc)
}

function parameterDecorator(classProto: any, key: string, index: number) {
  console.log(key, index);
}

function classDecorator (constructor: typeof Boat){
  console.log('constructor',constructor)
}