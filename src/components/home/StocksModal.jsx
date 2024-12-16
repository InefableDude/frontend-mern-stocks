import * as Dialog from 'toldo'

import { RiBriefcase2Line, RiStockLine, RiCloseLargeFill  } from 'react-icons/ri'
import { TbZoomMoney  } from 'react-icons/tb'

const StocksModal = ({ stock, handleWatchlist }) => {
	return !stock.watchlist ? ( <button onClick={() => handleWatchlist(stock)} className="transition duration-500 ease-in-out bg-blue-500 p-2 text-white rounded-lg border border-blue-300 shadow-md flex items-center justify-center gap-x-2 hover:scale-110 bg-green-600 hover:bg-green-700 "><RiStockLine className="text-orange-500"></RiStockLine> Add to Watchlist</button> ) : (
		<Dialog.Root>
      		<Dialog.Trigger className="transition duration-500 ease-in-out bg-blue-500 p-2 text-white rounded-lg border border-blue-300 shadow-md flex items-center justify-center gap-x-2 hover:scale-110 hover:bg-blue-600">
        		<TbZoomMoney className="text-green-400"></TbZoomMoney> On Watchlist
      		</Dialog.Trigger>
      		<Dialog.Portal>
		        <Dialog.Overlay className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-1" />
		       	<Dialog.Content className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 w-3/4 h-max flex-col overflow-hidden rounded-xl border border-slate-500 bg-slate-100 p-4 text-center shadow-lg shadow-black">
		          	<Dialog.Title className="text-3xl mb-4">Remover {stock.company}</Dialog.Title>
		          	<Dialog.Description className="p-4 text-xl">
		            	¿Desea remover {stock.company} de la watchlist? 
		          	</Dialog.Description>
		          	<Dialog.Close className="absolute top-4 right-4 text-xl text-white border border-red-500 p-2 shadow-lg w-fit rounded-lg bg-red-400 transition duration-500 ease-in-out hover:bg-red-500 hover:scale-110">
		              	<RiCloseLargeFill></RiCloseLargeFill>
		            </Dialog.Close>
		          	<div className="flex items-center justify-center gap-x-16 border-slate-200 border-t bg-slate-100 pt-4">
		            	<Dialog.Close className="text-white border border-red-500 py-2 px-4 shadow-lg w-fit rounded-lg bg-red-400 transition duration-500 ease-in-out hover:bg-red-500">
		              		Cancel
		            	</Dialog.Close>
		            	<Dialog.Close onClick={() => handleWatchlist(stock)} className="text-white border border-green-500 py-2 px-4 shadow-lg w-fit rounded-lg bg-green-400 transition duration-500 ease-in-out hover:bg-green-500">
		              		Si
		            	</Dialog.Close>
		          	</div>
		       	</Dialog.Content>
      		</Dialog.Portal>
    	</Dialog.Root>
    )
}

export default StocksModal