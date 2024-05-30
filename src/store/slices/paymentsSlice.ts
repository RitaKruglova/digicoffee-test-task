import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TPayments, TPaymentsArgs, TPaymentsSliceState } from '../../utils/types';
import { api } from '../../utils/Api';

export const fetchPayments = createAsyncThunk(
  'payments/fetchPayments',
  async ({ startDate, endDate, exactDate }: TPaymentsArgs): Promise<any> => {
    const response = await api.getPayments(startDate, endDate, exactDate);
    return response;
  }
);

const initialState: TPaymentsSliceState = {
  startDate: null,
  endDate: null,
  exactDate: null,
  filterType: 'exact',
  payments: {
    count: 0,
    next: '',
    previous: '',
    results: []
  }
};

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    setStartDate(state, action: PayloadAction<Date | null>) {
      state.startDate = action.payload;
      state.exactDate = null;
    },
    setEndDate(state, action: PayloadAction<Date | null>) {
      state.endDate = action.payload;
      state.exactDate = null;
    },
    setExactDate(state, action: PayloadAction<Date | null>) {
      state.exactDate = action.payload;
      state.startDate = null;
      state.endDate = null;
    },
    setFilterType(state, action: PayloadAction<'exact' | 'range'>) {
      state.filterType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.fulfilled, (state, action: PayloadAction<TPayments>) => {
        state.payments = action.payload;
      })
  }
});

export default paymentsSlice.reducer;
export const { setStartDate, setEndDate, setExactDate, setFilterType } = paymentsSlice.actions;