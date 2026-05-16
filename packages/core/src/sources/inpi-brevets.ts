import { z } from "zod";

export const InpiBrevetSchema = z.object({
  numero: z.string(),                                    // FR2700123, EP1234567
  type: z.enum(["FR", "EP", "PCT", "CCP"]),
  titre: z.string(),
  classificationCIB: z.array(z.string()),                // codes CIB hiérarchiques
  deposant: z.string(),
  inventeurs: z.array(z.string()),
  mandataire: z.string().nullable(),
  statut: z.enum(["demande", "publiee", "delivree", "rejetee", "retiree", "decheance"]),
  dateDepot: z.string(),
  datePublication: z.string().nullable(),
  dateDelivrance: z.string().nullable(),
  datePriorite: z.string().nullable(),
  abregeText: z.string().nullable(),
});
export type InpiBrevet = z.infer<typeof InpiBrevetSchema>;

export const InpiBrevetSearchResponseSchema = z.object({
  resultats: z.array(InpiBrevetSchema),
  total: z.number().int().nonnegative(),
  dateBase: z.string(),
});
export type InpiBrevetSearchResponse = z.infer<typeof InpiBrevetSearchResponseSchema>;
