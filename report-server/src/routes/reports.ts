import { user } from "./users";
import {} from "bson";
import { PrismaClient } from '@prisma/client'

import {Report} from'@prisma/client';
import { Static, Type } from "@sinclair/typebox";
import { ObjectId } from "bson";
import { FastifyInstance, FastifyRequest } from "fastify";
import _ from "lodash";
import { prismaClient } from "../prisma";
import { JwtPayload } from "../hooks/auth.service";

//valedation
export const report = Type.Object({
  report_id : Type.String(),
 name: Type.String(),
content: Type.String(),
  user_id: Type.String(),
  tags: Type.Array(Type.String()),

});
type report = Static<typeof report>;

const GetReportQuery = Type.Object({
  name: Type.Optional(Type.String()),
  content: Type.Optional(Type.String()),
  tags: Type.Optional(Type.Array(Type.String())),

});
type GetReportQuery = Static<typeof GetReportQuery>;

const ReportWithoutId = Type.Object({
  name: Type.String(),

  content: Type.String(),
    user_id: Type.String(),
    tags: Type.Array(Type.String()),
});
type ReportWithoutId = Static<typeof ReportWithoutId>;

const reportMinimal = Type.Object({
  name: Type.String(),
  content: Type.String(),

    tags: Type.Array(Type.String()),
});
type reportMinimal = Static<typeof reportMinimal>;

const partialreportMinimal = Type.Partial(reportMinimal);
type PartialreportMinimal = Static<typeof partialreportMinimal>;

const ReportParams = Type.Object({
  report_id : Type.String(),
});
type ReportParams = Static<typeof ReportParams>;

const PartialReports = Type.Partial(ReportWithoutId);
type PartialReports = Static<typeof report>;

const getReportById = Type.Object({
  report_id : Type.String(),
});
type getReportById = Static<typeof getReportById>;

const DeleteReportParams = Type.Object({
  report_id : Type.String(),
});
type DeleteReportParams = Static<typeof DeleteReportParams>;
const DeleteReportByUser = Type.Object({
  user_id: Type.String(),
});
type DeleteReportByUser = Static<typeof DeleteReportByUser>;

const GetReportByUserId= Type.Object({
  report_id : Type.String(),
 name: Type.String(),
content: Type.String(),
  user_id: Type.String(),
  tags: Type.String([]),
});
type GetReportByUserId= Static<typeof GetReportByUserId>;

export let reports: Report[] = [];

//CRUD
//______________________________________________________________________

export default async function (server: FastifyInstance) {
  server.route({
    method: "POST",
    url: "/createreportByUser",
    preHandler: [server.authenticate],
    schema: {
      summary: "Creates new package",
      tags: ["Reports"],
      body: reportMinimal,
    },
    handler: async (request: FastifyRequest<{ Body: reportMinimal }>, reply) => {
      const { uid: user_id } = request.user as JwtPayload;

      const { name, content, tags } = request.body;

      return await prismaClient.report.create({
        data: { name, content, user_id, tags },
      });
    },
  });

  server.route({
    method: "PUT",
    url: "/report",
    schema: {
      summary: "create a new report + all properties required",
      tags: ["Reports"],
      body: report,
    },

    handler: async (request, reply) => {
      const Repo = request.body as Report;
      if (!ObjectId.isValid(Repo.report_id)) {
        reply.badRequest("report_id should be an objectId!");
      } else {
        return await prismaClient.report.upsert({
          where: { report_id: Repo.report_id },
          create:Repo,
          update: _.omit(Repo, ["report_id"]),
        });
      }
    },
  });

  server.route({
    method: "PATCH",
    url: "/report/:report_id",
    preHandler: [server.authenticate],
    schema: {
      summary: "Update a package by id no need to pass all properties",
      tags: ["Reports"],
      body: partialreportMinimal,
      params: ReportParams,
    },
    handler: async (
      request: FastifyRequest<{
        Params: ReportParams;
        Body: PartialreportMinimal;
      }>,
      reply
    ) => {
      const jwtPayload = request.user as JwtPayload;
      const { report_id } = request.params;
      const reportData = request.body;

      if (!ObjectId.isValid(report_id)) {
        reply.badRequest("report_idshould be an objectId!");
        return;
      }

      let query: any = { report_id, user_id: jwtPayload.uid };

      // Allow admins to delete any package
      if (jwtPayload.role === "ADMIN") query = { report_id };

      return prismaClient.report.updateMany({
        where: query,
        data: reportData,
      });
    },
  });

  server.route({
    method: "DELETE",
    url: "/report/:report_id",
    preHandler: [server.authenticate],
    schema: {
      summary: "Deletes a report by id",
      tags: ["Reports"],
      params: Type.Object({
        report_id: Type.String(),
      }),
    },
    handler: async (request, reply) => {
      const { report_id} = request.params as DeleteReportParams;
      const jwtPayload = request.user as JwtPayload;

      if (!ObjectId.isValid(report_id)) {
        reply.badRequest("package_id should be an ObjectId");
        return;
      }

      let query: any = { report_id, user_id: jwtPayload.uid };

      // Allow admins to delete any package
      if (jwtPayload.role === "ADMIN") query = { report_id };

      return prismaClient.report.deleteMany({
        where: query,
      });
    },
  });
  //Get one package by id
  server.route({
    method: "GET",
    url: "/report/:report_id",
    schema: {
      summary: "Gets one report or null",
      tags: ["Reports"],
      params: Type.Object({
        report_id: Type.String(),
      }),
      // response:{
      // 		'2xx':Type.Union([pack , Type.Null()]),
      // },
    },
    handler: async (request, reply) => {
      const { report_id} = request.params as getReportById;
      if (!ObjectId.isValid(report_id)) {
        reply.badRequest("report_id should be an Object");
        return;
      }
      return prismaClient.report.findFirst({
        where: { report_id: report_id },
      });
    },
  });
  //get all packages or search by name
  server.route({
    method: "GET",
    url: "/Report",
    schema: {
      summary: "Get all reports",
      tags: ["Reports"],
      querystring: GetReportQuery,
      response: {
        "2xx": Type.Array(report),
      },
    },
    handler: async (request, reply) => {
      const { name, content,tags } = request.query as GetReportQuery;

      const findQuery: any = {};

      if (name) findQuery.where = { name: { contains: name } };
      if (content) findQuery.where = { content: { contains: content } };
      if (tags) findQuery.where = { tags: { contains: tags } };
   

      return prismaClient.report.findMany(findQuery);
    },
  });

  //user's own packages info_____________//_________//_____________//
  server.route({
    method: "GET",
    url: "/report/details/:user_id",
    schema: {
      summary: "Gets users packages or null",
      tags: ["Reports"],
      params: Type.Object({
        user_id: Type.String(),
      }),
      // response:{
      // 		'2xx':Type.Union([pack , Type.Null()]),
      // },
    },
    handler: async (request, reply) => {
      const { user_id } = request.params as GetReportByUserId;
      if (!ObjectId.isValid(user_id)) {
        reply.badRequest("user_id should be an ObjectId");
        return;
      }
      return prismaClient.report.findMany({
        where: { user_id },
      });
    },
  });


}