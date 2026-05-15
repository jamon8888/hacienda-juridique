import { z } from "zod";

export const InpiMarqueSchema = z.object({
  numero: z.string(),                                    // numéro national INPI
  signe: z.string(),                                     // dénomination ou description figuratif
  type: z.enum(["mot", "figuratif", "composite"]).optional(),
  classes: z.array(z.string()),                          // classes Nice "1" à "45"
  titulaire: z.string(),                                 // raison sociale
  mandataire: z.string().nullable(),
  statut: z.enum([
    "deposee", "publiee", "enregistree", "rejetee",
    "abandonnee", "expirée", "renouvelée", "en_opposition"
  ]),
  dateDepot: z.string(),                                 // ISO YYYY-MM-DD
  dateEnregistrement: z.string().nullable(),
  dateExpiration: z.string().nullable(),
});

export type InpiMarque = z.infer<typeof InpiMarqueSchema>;

export const InpiSearchResponseSchema = z.object({
  resultats: z.array(InpiMarqueSchema),
  total: z.number().int().nonnegative(),
  dateBase: z.string(),                                  // dernière maj base INPI
});

export type InpiSearchResponse = z.infer<typeof InpiSearchResponseSchema>;
