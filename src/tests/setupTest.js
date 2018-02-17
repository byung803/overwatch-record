import DotEnv from 'dotenv';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

DotEnv.config({ path: '.env.test' });

Enzyme.configure({
    adapter: new Adapter()
});

//jest.config.json이랑 연결돼있다. 