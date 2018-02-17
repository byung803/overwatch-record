import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixture/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn(); 
    wrapper = shallow(
        <ExpenseListFilters 
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
    );
});

test('should render ExpenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
    wrapper.setProps({
        filters: altFilters        
    });    
    expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
    // const e = {
    //     target: {
    //         value: 'molang'
    //     }    
    // };
    // wrapper.find('input').prop('onChange')(e);
    //아래와 위와 동일한 코드다. 
    wrapper.find('input').simulate('change', {
        target: {
            value: 'molang'
        }
    });
    expect(setTextFilter).toHaveBeenLastCalledWith('molang');
});

test('should sort by date', () => {
    wrapper.setProps({
        filters: altFilters        
    }); 
    const e = {
        target: {
            value: 'date'
        }    
    };
    wrapper.find('select').prop('onChange')(e);
    expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', () => {
    const e = {
        target: {
            value: 'amount'
        }    
    };
    wrapper.find('select').prop('onChange')(e);
    expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date changes', () => {
    const startDate = moment(0).subtract(1, 'days');
    const endDate = moment(0).add(2, 'days');
    wrapper.find('DateRangePicker').prop('onDatesChange')({startDate, endDate}); 

    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle data focus changes', () => {
    const calendarFocused = "endDate"; 
    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused); 
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});

