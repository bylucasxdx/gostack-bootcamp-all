import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

export default class ForgotPasswordController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { token, password } = request.body;

        const resetPassword = container.resolve(ResetPasswordService);

        await resetPassword.execute({
            token,
            password,
        });

        return response.json({
            message: 'Sucesso na alteração de senha',
        });
    }
}
