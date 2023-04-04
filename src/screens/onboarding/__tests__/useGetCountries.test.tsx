import { Country } from '../../../data/types'
import { useGetCountries } from '../hooks/useGetCountries'
import { act, renderHook } from '@testing-library/react-hooks'
import { api } from '../../../network/AmkBankClient'
import { useErrorStore } from '../../../stores/errorStore'
import { Strings } from '../../../i18n/strings'

const mockedCountries: Country[] = [{ name: 'sk', id: '0', flag: 'flag' }]

// axios needs to be mocked, otherwise tests fail
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
  })),
}))

jest.mock('../../../network/AmkBankClient')

describe('useGetCountries', () => {
  const initialStoreState = useErrorStore.getState()

  beforeEach(() => {
    jest.resetAllMocks()
    useErrorStore.setState(initialStoreState)
  })

  it('loading flag is handled correctly', async () => {
    jest.spyOn(api, 'getCountries').mockResolvedValueOnce(mockedCountries)
    const { result, waitForNextUpdate } = renderHook(() => useGetCountries())
    expect(result.current.isLoading).toBe(false)

    act(() => {
      result.current.callGetCountries()
    })

    expect(result.current.isLoading).toBe(true)
    await waitForNextUpdate()
    expect(result.current.isLoading).toBe(false)
  })

  it('fetches countries successfully', async () => {
    jest.spyOn(api, 'getCountries').mockResolvedValueOnce(mockedCountries)

    const { result, waitForNextUpdate } = renderHook(() => useGetCountries())

    act(() => {
      result.current.callGetCountries()
    })

    await waitForNextUpdate()
    expect(api.getCountries).toHaveBeenCalledTimes(1)
    expect(result.current.countries).toBe(mockedCountries)
  })

  it('handles error on fetching countries', async () => {
    jest.spyOn(api, 'getCountries').mockRejectedValueOnce('error')

    const { result: errorStateResult } = renderHook(() => useErrorStore((state) => state.errorMessage))
    const { result, waitForNextUpdate } = renderHook(() => useGetCountries())

    act(() => {
      result.current.callGetCountries()
    })

    await waitForNextUpdate()

    expect(api.getCountries).toHaveBeenCalledTimes(1)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.countries).toEqual([])
    expect(errorStateResult.current).toBe(Strings.onboarding_country_error)
  })
})
