import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeMailProvider: FakeMailProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeMailProvider = new FakeMailProvider();
        fakeUsersRepository = new FakeUsersRepository();
        fakeUserTokensRepository = new FakeUserTokensRepository();

        sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeMailProvider,
            fakeUserTokensRepository,
        );
    });

    it('should be able to create a new user', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await fakeUsersRepository.create({
            name: 'Fulano Silva',
            email: 'fulano.silva@example.com',
            password: '123456',
        });

        await sendForgotPasswordEmail.execute({
            email: 'fulano.silva@example.com',
        });

        expect(sendMail).toHaveBeenCalled();
    });

    it('should be able to recover password with non existing user', async () => {
        await expect(
            sendForgotPasswordEmail.execute({
                email: 'fulano.silva@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should generate a forgot password token', async () => {
        const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

        const user = await fakeUsersRepository.create({
            name: 'Fulano Silva',
            email: 'fulano.silva@example.com',
            password: '123456',
        });

        await sendForgotPasswordEmail.execute({
            email: 'fulano.silva@example.com',
        });

        expect(generateToken).toHaveBeenCalledWith(user.id);
    });
});
