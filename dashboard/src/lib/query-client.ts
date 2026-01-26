import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// With SSR, we usually want to set some default staleTime
			// above 0 to avoid refetching immediately on the client
			staleTime: 60 * 1000, // 1 minute
			retry: (failureCount, error: any) => {
				// Don't retry on 4xx errors (except 401/403)
				if (
					error?.status >= 400 &&
					error?.status < 500 &&
					error?.status !== 401 &&
					error?.status !== 403
				) {
					return false
				}
				return failureCount < 3
			},
		},
	},
})
