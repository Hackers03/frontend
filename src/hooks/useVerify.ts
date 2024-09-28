/*
	le hook useVerify verifie à chaque rafraichissement de la page
	si le cookie acces token est valide c'est dire non n'expiré ou existant
	si oui l'utilisateur resté logué
*/

import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setAuth, finishInitialLoad } from '@/redux/features/authSlice';
import { useVerifyMutation } from '@/redux/features/authApiSlice';

const useVerify = () => {
	const dispatch = useAppDispatch();

	const [verify] = useVerifyMutation();

	useEffect(() => {
		verify(undefined)
			.unwrap()
			.then(() => {
				// le cookie de l'access token est existant et valide donc l'utilisateur reste logué
				dispatch(setAuth());
			})
			.finally(() => {
				dispatch(finishInitialLoad());
			});
	}, [dispatch, verify]);
}

export default useVerify;