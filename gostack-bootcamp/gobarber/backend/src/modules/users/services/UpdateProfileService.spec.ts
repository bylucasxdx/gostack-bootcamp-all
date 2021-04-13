import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfile = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('should be able to update an user profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Fulano Silva',
            email: 'fulano.silva@example.com',
            password: '123456',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'Fulano Silva Silva',
            email: 'fulano.silva.silva@example.com',
        });

        expect(updatedUser.name).toBe('Fulano Silva Silva');
        expect(updatedUser.email).toBe('fulano.silva.silva@example.com');
    });

    it('should not be able to update a profile from a non-existing-user', async () => {
        await expect(
            updateProfile.execute({
                user_id: 'none-existing-user-id',
                name: 'Test',
                email: 'test@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to change email if already in use', async () => {
        await fakeUsersRepository.create({
            name: 'Fulano Silva',
            email: 'fulano.silva@example.com',
            password: '123456',
        });

        const user = await fakeUsersRepository.create({
            name: 'Test',
            email: 'test@example.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'Test',
                email: 'fulano.silva@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update a password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Fulano Silva',
            email: 'fulano.silva@example.com',
            password: '123456',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'Fulano Silva Silva',
            email: 'fulano.silva.silva@example.com',
            old_password: '123456',
            password: '123123',
        });

        expect(updatedUser.password).toBe('123123');
    });

    it('should not be able to update a password without a old_password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Fulano Silva',
            email: 'fulano.silva@example.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'Fulano Silva Silva',
                email: 'fulano.silva.silva@example.com',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update a password with a invalid password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Fulano Silva',
            email: 'fulano.silva@example.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'Fulano Silva Silva',
                email: 'fulano.silva.silva@example.com',
                old_password: 'wrong-old-password',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
