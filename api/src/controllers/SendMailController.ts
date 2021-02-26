import {Request, Response} from 'express';
import {getCustomRepository} from 'typeorm';
import {SurveysRepository} from '../repositories/SurveysRepository';
import {UsersRepository} from '../repositories/UsersRepository';
import {SurveysUsersRepository} from '../repositories/SurveysUsersRepository';

class SendMailController {
	
	async execute(request: Request, response: Response) {
		const {email, survey_id} = request.body;

		const usersRepository = getCustomRepository(UsersRepository);
		const surveysRepository = getCustomRepository(SurveysRepository);
		const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

		const userExists = await usersRepository.findOne({email});

		if (!userExists) {
			return response.status(400).json({
				error: "User does not exists",
			});
		}

		const surveyExist = await surveysRepository.findOne({id: survey_id});

		if (!surveyExist) {
			return response.status(400).json({
				error: "Survey does not exists",
			});
		}

		const surveyUser = surveysUsersRepository.create({
			user_id: userExists.id,
			survey_id
		});

		await surveysUsersRepository.save(surveyUser);
		return response.json(surveyUser);
	}

}

export {SendMailController}