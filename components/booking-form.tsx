'use client'

import React from 'react'

export function BookingFormComponent() {
  return (
    <div className="bg-white shadow-md p-6 max-w-4xl mx-auto -mt-16 relative z-10">
      <form className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
          <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-1">
            체크인
          </label>
          <input
            type="date"
            id="checkIn"
            name="checkIn"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
          <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-1">
            체크아웃
          </label>
          <input
            type="date"
            id="checkOut"
            name="checkOut"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
          <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
            인원
          </label>
          <select
            id="guests"
            name="guests"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className="w-full md:w-1/4 px-2 flex items-end">
          <button
            type="submit"
            className="w-full bg-red-800 text-white font-bold py-2 px-4 rounded"
          >
            검색
          </button>
        </div>
      </form>
    </div>
  )
}