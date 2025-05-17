interface WeatherCardProps {
    data: any
  }
  
  export default function WeatherCard({ data }: WeatherCardProps) {
    const { location, current } = data
  
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 text-center text-black dark:text-white">
        <h2 className="text-xl font-semibold mb-2">
          {location.name}, {location.country}
        </h2>
        <img
          src={current.condition.icon}
          alt={current.condition.text}
          className="mx-auto"
        />
        <p className="text-lg">
          {current.temp_c}°C - {current.condition.text}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Feels like {current.feelslike_c}°C
        </p>
      </div>
    )
  }
  