import React, { useEffect, useRef, useState } from 'react'

interface TimerProps {
	shouldStart: boolean
}

export const Timer: React.FC<TimerProps> = ({ shouldStart }) => {
	const [mounted, setMounted] = useState(false)
	const [running, setRunning] = useState(false)
	const [ms, setMs] = useState(0)
	const intervalRef = useRef<number | null>(null)
	const lastTick = useRef<number | null>(null)

	// Handle hydration
	useEffect(() => {
		setMounted(true)
	}, [])

	const start = () => {
		if (running) return
		setRunning(true)
		lastTick.current = performance.now()
		intervalRef.current = window.setInterval(() => {
			const now = performance.now()
			const delta = now - (lastTick.current ?? now)
			lastTick.current = now
			setMs(prev => prev + Math.round(delta))
		}, 50)
	}

	useEffect(() => {
		if (mounted && shouldStart && !running) {
			start()
		}
	}, [shouldStart, running, mounted])

	useEffect(() => {
		return () => {
			if (intervalRef.current) window.clearInterval(intervalRef.current)
		}
	}, [])

	const pad = (n: number, digits = 2) => n.toString().padStart(digits, '0')
	const msToParts = (totalMs: number) => {
		const centiseconds = Math.floor((totalMs % 1000) / 10)
		const seconds = Math.floor((totalMs / 1000) % 60)
		const minutes = Math.floor((totalMs / (1000 * 60)) % 60)
		const hours = Math.floor(totalMs / (1000 * 60 * 60))
		return { hours, minutes, seconds, centiseconds }
	}

	const { hours, minutes, seconds, centiseconds } = msToParts(ms)
	const display = hours
		? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(centiseconds, 2)}`
		: `${pad(minutes)}:${pad(seconds)}.${pad(centiseconds, 2)}`

	const R = 56
	const C = 2 * Math.PI * R
	const maxMs = 1000 * 60 * 60
	const progress = Math.min(ms / maxMs, 1)
	const dash = C * (1 - progress)

	if (!mounted) {
		return (
			<div className='fixed z-40 top-5 right-1/2 translate-x-1/2 font-mono text-2xl md:text-3xl font-semibold'>
				00:00.00
			</div>
		)
	}

	return (
		<div className='fixed z-40 top-5 right-1/2 translate-x-1/2  font-mono text-2xl md:text-3xl font-semibold'>
			{display}
		</div>
	)
}
