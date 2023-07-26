import { ClipLoader } from 'react-spinners';

export default function Spinner({ loading }) {
    return (
        <div className=" text-center w-full">
            <h1 className="text-3xl font-bold text-[#0c0b58] my-8">Loading...</h1>
            <ClipLoader
                color='white'
                aria-label='Loading Spinner'
                loading={loading}
                size='8rem'
                className='mb-8'
            />
        </div>
    );
}
