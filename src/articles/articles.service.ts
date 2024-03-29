import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async create(createArticleDto: CreateArticleDto) {
    try {
      const article = this.prisma.article.create({ data: createArticleDto });
      return article;
    } catch (error) {
      throw new InternalServerErrorException('Something bad happened');
    }
  }

  async findAll() {
    const article = await this.prisma.article.findMany({
      where: { published: true },
    });
    return article;
  }

  async findDrafts() {
    const article = await this.prisma.article.findMany({
      where: { published: false },
    });
    return article;
  }

  async findOne(id: number) {
    const article = await this.prisma.article.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });

    if (!article) {
      throw new NotFoundException(`Article with id: ${id} does not exist`);
    }

    return article;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const article = await this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });

    return article;
  }

  async remove(id: number) {
    const article = await this.prisma.article.delete({ where: { id } });
    return article;
  }
}
