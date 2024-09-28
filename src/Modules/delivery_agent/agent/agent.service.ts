import { Injectable } from '@nestjs/common';
import { CreateAgentDto } from '../../../dtos/create-agent.dto';
import { UpdateAgentDto } from '../../../dtos/update-agent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Agent } from 'src/entities/agent.entity';
import { QueryBuilder, Repository } from 'typeorm';

@Injectable()
export class AgentService {
  constructor(@InjectRepository(Agent)
    private readonly agentRepo : Repository<Agent>){}
  async create(createAgentDto: CreateAgentDto) {
   const result = await this.agentRepo.save(createAgentDto);
   if(!result){return {message:"user not create"}}
   else{
    return result;
   }
  }

  async findAll() {
    const querybuilder = await this.agentRepo.createQueryBuilder("agent");
    const result = await querybuilder
                   .getMany();
    if(!result){return {message:"user not found"}}
    else{
    return result;
    }   
  }
  async getAgent(mobile:number){
     const querybuilder=await this.agentRepo.createQueryBuilder('agent')
     const result=await querybuilder
      .where('agent.mobile = :mobile',{mobile})
      .getOne()
     
         return result
  }

  async findOne(id: number) {
    const querybuilder = await this.agentRepo.createQueryBuilder("agent");
    const result = await querybuilder
                   .where("agent.id = :id",{id:id})
                   .getOne();
  
    return result;
      }

  async update(id: number, updateAgentDto: UpdateAgentDto) {
const result = await this.agentRepo.update(id,updateAgentDto);
if(result.affected == 0){
  return {message:"no any updates were made"}
}
else{
  return {result,message:"update were made successfully"}
}
  }

  async remove(id: number) {
    const querybuilder = await this.agentRepo.createQueryBuilder("agent");
    const result1 = await querybuilder
                   .where("agent.id = :id",{id:id})
                   .getOne();
    if(!result1){return {message:"user not found"}}
    else{
      const result  = await querybuilder.where("agent.id = :id", {id:id}).delete().execute();
    return {message:`user records of ${result1.name} deleted successfully `}
    }
    }
  async updateUserFCMToken(id, fcmToken) {
    try {
        const user = await this.agentRepo.findOne({where:{id:id}})
        if (!user) {
            throw new Error("User not found");
        }
        user.fcmtoken = fcmToken;
        await this.agentRepo.save(user)   
        return "FCM token updated successfully";
    } catch (error) {
        throw error;
    }
}
async get(id:number){
  const users= this.agentRepo.findOne({
      where:{id:id},
      select:['id','name','address','fcmtoken']
    })
    if(!users){
      throw new Error(`User with userid ${id} not found`)
    }
    return users
}

}
